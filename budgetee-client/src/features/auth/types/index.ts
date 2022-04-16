import { User } from "../../../types";

export type UserResponse = {
  jwt: string;
  user: User;
};