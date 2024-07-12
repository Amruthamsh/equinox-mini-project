//import { faker } from "@faker-js/faker";
import { Candidate } from "@/models/candidate-model";
import { dbConnect } from "@/lib/mongo";

async function main() {
  await dbConnect();
}

main();
