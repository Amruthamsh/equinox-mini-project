import mongoose from "mongoose";

export async function dbConnect() {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected to database");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting to database...");
    return;
  }

  try {
    const conn = await mongoose.connect(
      String(process.env.MONGO_DB_CONNECTION_STRING)
    );
    return conn;
  } catch (error) {
    console.log("Error in connecting to database", error);
    throw new Error("Error connecting to database");
  }
}
