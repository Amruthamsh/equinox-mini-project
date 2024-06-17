import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/queries/users";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/mongo";

export const POST = async (request: NextRequest) => {
  const { name, email, password, role } = await request.json();

  console.log(name, email, password, role);

  //create a db connection
  await dbConnect();

  //encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5);

  //form a db payload
  const newUser = {
    name,
    password: hashedPassword,
    email,
    role,
  };

  //update this db
  try {
    await createUser(newUser);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });
};
