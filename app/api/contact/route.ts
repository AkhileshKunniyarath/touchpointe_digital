import { NextRequest, NextResponse } from "next/server";

import { handleApiError } from "@/lib/api-utils";
import { createContactSubmission } from "@/lib/resource-service";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const submission = await createContactSubmission(payload);

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ submission })
        });
      } catch (error) {
        console.warn("[contact_webhook] Unable to forward submission.", error);
      }
    }

    return NextResponse.json({ submission }, { status: 201 });
  } catch (error) {
    return handleApiError(error, "Unable to submit contact request.");
  }
}
