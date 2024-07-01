import { Types } from "mongoose";
import { NextApiRequest } from "next";
imp;

declare module "next" {
  interface NextApiRequest {
    user?: {
      username: string;
      purchasedCourses: Types.ObjectId[];
    };
  }
}
