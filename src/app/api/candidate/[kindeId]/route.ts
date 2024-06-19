import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { Candidate } from "@/models/candidate-model";
import { Types } from "mongoose";
import { request } from "http";

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
    const candidate = await Candidate.findOne({
      kindeAuthId: params.kindeId,
    });

    return new NextResponse(JSON.stringify(candidate));
  } catch (error) {
    return new NextResponse("Error in fetching candidate" + error, {
      status: 500,
    });
  }
};
