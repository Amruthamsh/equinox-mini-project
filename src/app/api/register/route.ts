import { NextRequest, NextResponse } from "next/server";
import { createCandidate } from "@/queries/users";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/mongo";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();

  console.log(name, email, password);

  //create a db connection
  await dbConnect();

  //encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5);

  //form a db payload
  const newCandidate = {
    name,
    password: hashedPassword,
    email,
  };

  //update this db
  try {
    await createCandidate(newCandidate);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });
};
