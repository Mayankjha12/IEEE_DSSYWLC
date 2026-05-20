/**
 * Google Sheets integration — pushes new registrations to a Google Sheet
 * via a Google Apps Script Web App (deployed as webhook).
 *
 * The webhook URL is set via GOOGLE_SHEET_WEBHOOK_URL in .env.local
 *
 * Google Apps Script web apps respond with a 302 redirect.
 * From cloud environments (Vercel / AWS) the default fetch may get a 404
 * because Next.js extends `fetch` with caching behaviour and Google may
 * block requests without a recognisable User-Agent.
 *
 * Strategy: POST with redirect:"manual", then manually follow the
 * redirect Location so the body is never dropped and we bypass any
 * Next.js fetch-layer caching.
 */

const WEBHOOK_URL = () => process.env.GOOGLE_SHEET_WEBHOOK_URL;

export async function pushRegistrationToSheet(data: {
  profileToken: string;
  fullName: string;
  email: string;
  phone: string;
  affiliation: string;
  category: string;
  referralCode: string | null;
  isMember: boolean;
  ieeeId: string | null;
  studentBranchCode: string | null;
  ieeeCardS3Key: string | null;
  paymentScreenshotS3Key: string;
  registrationStatus: string;
}): Promise<boolean> {
  const url = WEBHOOK_URL();

  if (!url) {
    console.warn("GOOGLE_SHEET_WEBHOOK_URL not set — skipping sheet sync.");
    return false;
  }

  const payload = JSON.stringify({
    action: "new_registration",
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL || "https://ieee-dssywlc.vercel.app",
    ...data,
    timestamp: new Date().toISOString(),
  });

  try {
    // Use redirect:"manual" so we control the redirect chain ourselves
    // and avoid Next.js fetch caching / Google blocking issues.
    const initial = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "User-Agent": "IEEE-DSSYWLC-Server/1.0",
      },
      body: payload,
      redirect: "manual",
      cache: "no-store",
    });

    // Google Apps Script returns a 302 redirect — follow it manually
    if (initial.status >= 300 && initial.status < 400) {
      const redirectUrl = initial.headers.get("location");
      if (redirectUrl) {
        const finalRes = await fetch(redirectUrl, {
          cache: "no-store",
          headers: {
            "User-Agent": "IEEE-DSSYWLC-Server/1.0",
          },
        });
        if (!finalRes.ok) {
          const body = await finalRes.text();
          console.error(
            "Google Sheet webhook redirect failed:",
            finalRes.status,
            body.substring(0, 200)
          );
          return false;
        }
        console.log("Google Sheet sync OK (via redirect)");
        return true;
      }
    }

    // If no redirect, check direct response
    if (!initial.ok) {
      const body = await initial.text();
      console.error(
        "Google Sheet webhook failed:",
        initial.status,
        body.substring(0, 200)
      );
      return false;
    }

    console.log("Google Sheet sync OK (direct)");
    return true;
  } catch (error) {
    console.error("Failed to push to Google Sheet:", error);
    return false;
  }
}
