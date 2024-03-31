import jwt from "jsonwebtoken";
import { IUser } from "../lib/types/user";

export const signToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );
};
