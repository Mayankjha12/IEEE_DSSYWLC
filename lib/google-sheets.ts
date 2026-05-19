/**
 * Google Sheets integration — pushes new registrations to a Google Sheet
 * via a Google Apps Script Web App (deployed as webhook).
 *
 * The webhook URL is set via GOOGLE_SHEET_WEBHOOK_URL in .env.local
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

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "new_registration",
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ieee-dssywlc.vercel.app",
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error("Google Sheet webhook failed:", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to push to Google Sheet:", error);
    return false;
  }
}
