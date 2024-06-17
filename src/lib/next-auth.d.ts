import { UserType } from "@/model/user-model";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  type JWT = UserType;
}

declare module "next-auth" {
  interface Session {
    user: UserType;
  }
}
