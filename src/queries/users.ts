//where model and DB is getting connected

import { User } from "@/model/user-model";

export async function createUser(newUser: any) {
  try {
    const user = await User.create(newUser);
  } catch (e) {
    throw e;
  }
}
