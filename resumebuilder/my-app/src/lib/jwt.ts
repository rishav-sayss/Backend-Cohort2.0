import { JWTpayload } from "@/types/user.types";
import jwt from "jsonwebtoken";

export const generateToken = (payload: JWTpayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export const  verifyToken = (token:string) :any => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};


