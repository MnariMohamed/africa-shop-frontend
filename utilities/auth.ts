import jwt from "jsonwebtoken";
import { IUser } from "../lib/types/user";

export const signToken = (user: IUser) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      // isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );
};
