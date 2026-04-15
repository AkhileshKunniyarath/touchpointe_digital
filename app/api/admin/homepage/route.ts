import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Homepage from "@/models/Homepage";
import { homepageSchema } from "@/schemas/homepage";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const homepage = await Homepage.findOne({});
    if (!homepage) {
      return NextResponse.json({ success: true, data: {} });
    }
    return NextResponse.json({ success: true, data: homepage });
  } catch (error) {
    console.error("[HOMEPAGE_GET_ERROR]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch homepage data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const payload = await req.json();
    
    // Parse using Zod
    const validatedData = homepageSchema.parse(payload);

    await connectToDatabase();

    // Upsert the solitary document
    const updated = await Homepage.findOneAndUpdate(
      {}, // Target without ID to grab the first/only document
      { $set: validatedData },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: updated });

  } catch (error) {
    console.error("[HOMEPAGE_PUT_ERROR]", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
