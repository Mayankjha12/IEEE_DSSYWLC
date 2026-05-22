/**
 * API endpoint for Google Apps Script to sync status changes back to the DB.
 *
 * Google Apps Script calls this when an admin changes the status column
 * in the Google Sheet. It updates the DB and optionally triggers a
 * status-change email to the registrant.
 *
 * Protected by ADMIN_API_SECRET — the script must send this in the header.
 */

import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { sendStatusUpdateEmail } from "@/lib/email";

const VALID_STATUSES = [
  "under_review",
  "verified",
  "rejected",
  "needs_info",
] as const;
type Status = (typeof VALID_STATUSES)[number];

function isValidStatus(s: string): s is Status {
  return (VALID_STATUSES as readonly string[]).includes(s);
}

export async function POST(request: NextRequest) {
  // Authenticate
  const secret = request.headers.get("x-admin-secret");
  if (
    !process.env.ADMIN_API_SECRET ||
    secret !== process.env.ADMIN_API_SECRET
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { email?: string; status?: string; remarks?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, status, remarks } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  if (!status || !isValidStatus(status)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 },
    );
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    // Get existing registration
    const existing = await db
      .select()
      .from(registrations)
      .where(eq(registrations.email, normalizedEmail))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    const registration = existing[0];
    const previousStatus = registration.registrationStatus;

    // Update status in DB
    await db
      .update(registrations)
      .set({
        registrationStatus: status,
        updatedAt: new Date(),
      })
      .where(eq(registrations.email, normalizedEmail));

    // Send email notification if status actually changed
    let emailSent = false;
    if (previousStatus !== status) {
      emailSent = await sendStatusUpdateEmail(
        normalizedEmail,
        registration.fullName,
        status,
        registration.profileToken,
        remarks || null,
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status updated to "${status}" for ${normalizedEmail}`,
      emailSent,
    });
  } catch (error) {
    console.error("Status update failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
