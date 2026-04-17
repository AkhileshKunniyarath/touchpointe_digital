import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-utils";
import { connectToDatabase } from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId, jobTitle, name, email, phone, coverLetter, resumeUrl } = body;

    if (!jobId || !jobTitle || !name || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await connectToDatabase();
    const application = await JobApplication.create({
      jobId,
      jobTitle,
      name,
      email,
      phone: phone || "",
      coverLetter: coverLetter || "",
      resumeUrl: resumeUrl || "",
      status: "new"
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    return handleApiError(error, "Unable to submit application.");
  }
}
