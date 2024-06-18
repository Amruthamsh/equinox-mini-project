import { NextRequest, NextResponse } from "next/server";
//import { createUser } from "@/queries/users";
import { dbConnect } from "@/lib/mongo";

export const POST = async (request: NextRequest) => {
  const { name, email, password, role } = await request.json();

  console.log(name, email, password, role);

  //create a db connection
  await dbConnect();

  //form a db payload
  const newUser = {
    name,
    email,
    role,
  };

  //update this db
  try {
    // await createUser(newUser);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });
};
