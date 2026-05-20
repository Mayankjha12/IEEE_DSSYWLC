import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!url) {
    return NextResponse.json({
      step: "ENV_CHECK",
      error: "GOOGLE_SHEET_WEBHOOK_URL is NOT set on this deployment",
    });
  }

  const payload = JSON.stringify({
    action: "new_registration",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ieee-dssywlc.vercel.app",
    profileToken: "vercel-fix-test-" + Date.now(),
    fullName: "Vercel Fix Test",
    email: "vercel-fix@debug.com",
    phone: "+910000000000",
    affiliation: "Vercel Debug",
    category: "student",
    referralCode: null,
    isMember: false,
    ieeeId: null,
    studentBranchCode: null,
    ieeeCardS3Key: null,
    paymentScreenshotS3Key: "vercel-fix-test",
    registrationStatus: "under_review",
    timestamp: new Date().toISOString(),
  });

  try {
    // Step 1: POST with redirect:"manual" and text/plain
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

    const info: Record<string, unknown> = {
      initialStatus: initial.status,
      initialStatusText: initial.statusText,
      initialRedirected: initial.redirected,
    };

    // Step 2: Follow redirect manually if 302
    if (initial.status >= 300 && initial.status < 400) {
      const redirectUrl = initial.headers.get("location");
      info.redirectUrl = redirectUrl?.substring(0, 80) + "...";

      if (redirectUrl) {
        const finalRes = await fetch(redirectUrl, {
          cache: "no-store",
          headers: { "User-Agent": "IEEE-DSSYWLC-Server/1.0" },
        });
        const body = await finalRes.text();
        info.finalStatus = finalRes.status;
        info.finalBody = body.substring(0, 500);
        info.success = finalRes.ok;
      }
    } else {
      const body = await initial.text();
      info.directBody = body.substring(0, 500);
      info.success = initial.ok;
    }

    return NextResponse.json({ step: "RESULT", ...info });
  } catch (err: unknown) {
    return NextResponse.json({
      step: "ERROR",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
