import nodemailer from "nodemailer";

function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    ""
  );
}

function getSmtpConfig() {
  const host = process.env.BREVO_SMTP_HOST;
  const port = Number(process.env.BREVO_SMTP_PORT || "587");
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_PASS;
  const fromEmail = process.env.BREVO_FROM_EMAIL;
  const fromName = process.env.BREVO_FROM_NAME || "DSSYWLC 2025";

  if (!host || !user || !pass || !fromEmail || Number.isNaN(port)) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
    fromEmail,
    fromName,
  };
}

export async function sendConfirmationEmail(
  to: string,
  name: string,
  profileToken: string
): Promise<boolean> {
  const config = getSmtpConfig();

  if (!config) {
    console.warn("Brevo SMTP is not fully configured. Skipping email send.");
    return false;
  }

  const profileUrl = `${getSiteUrl()}/profiles?token=${encodeURIComponent(
    profileToken
  )}`;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to,
      subject: "DSSYWLC 2025 — Registration Received",
      text: [
        `Hi ${name},`,
        "",
        "Your DSSYWLC 2025 registration has been received.",
        "Current status: Under review",
        "",
        `Track your profile here: ${profileUrl}`,
        "",
        "DSSYWLC 2025",
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <p>Hi ${name},</p>
          <p>Your DSSYWLC 2025 registration has been received.</p>
          <p><strong>Status:</strong> Under review</p>
          <p>
            You can view your registration profile here:<br />
            <a href="${profileUrl}">${profileUrl}</a>
          </p>
          <p>Thank you for registering for DSSYWLC 2025.</p>
          <p style="margin-top: 24px; color: #6b7280; font-size: 13px;">
            Delhi Section Student, Young Professionals, Women in Engineering &amp; Life Members Congress
          </p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return false;
  }
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  verified: { label: "Approved ✅", color: "#16a34a" },
  rejected: { label: "Rejected ❌", color: "#dc2626" },
  needs_info: { label: "More Information Needed ⚠️", color: "#d97706" },
  under_review: { label: "Under Review", color: "#6b7280" },
};

export async function sendStatusUpdateEmail(
  to: string,
  name: string,
  newStatus: string,
  profileToken: string,
  remarks: string | null
): Promise<boolean> {
  const config = getSmtpConfig();

  if (!config) {
    console.warn("Brevo SMTP not configured. Skipping status email.");
    return false;
  }

  const profileUrl = `${getSiteUrl()}/profiles?token=${encodeURIComponent(
    profileToken
  )}`;

  const statusInfo = STATUS_LABELS[newStatus] || STATUS_LABELS.under_review;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const remarksBlock = remarks
    ? `<p style="background: #fef3c7; padding: 12px; border-radius: 6px; border-left: 4px solid #d97706;"><strong>Reviewer Remarks:</strong><br/>${remarks}</p>`
    : "";

  try {
    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to,
      subject: `DSSYWLC 2025 — Registration ${statusInfo.label}`,
      text: [
        `Hi ${name},`,
        "",
        `Your DSSYWLC 2025 registration status has been updated to: ${statusInfo.label}`,
        "",
        remarks ? `Reviewer remarks: ${remarks}` : "",
        "",
        `View your profile: ${profileUrl}`,
        "",
        "DSSYWLC 2025",
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <p>Hi ${name},</p>
          <p>Your DSSYWLC 2025 registration status has been updated:</p>
          <p style="font-size: 18px;">
            <strong style="color: ${statusInfo.color};">${statusInfo.label}</strong>
          </p>
          ${remarksBlock}
          <p>
            View your registration profile:<br />
            <a href="${profileUrl}">${profileUrl}</a>
          </p>
          <p style="margin-top: 24px; color: #6b7280; font-size: 13px;">
            Delhi Section Student, Young Professionals, Women in Engineering & Life Members Congress
          </p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Failed to send status update email:", error);
    return false;
  }
}
