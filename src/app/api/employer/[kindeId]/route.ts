import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { Employer } from "@/models/employer-model";
import { Types } from "mongoose";


export const GET = async (
  request: Request,
  { params }: { params: { kindeId: string } }
) => {
  try {
    if (!params.kindeId) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing kindeId" }),
        { status: 400 }
      );
    }
    await dbConnect();
    const employer = await Employer.findOne({
      kindeAuthId: params.kindeId,
    });

    return new NextResponse(JSON.stringify(employer));
  } catch (error) {
    return new NextResponse("Error in fetching employer" + error, {
      status: 500,
    });
  }
};
