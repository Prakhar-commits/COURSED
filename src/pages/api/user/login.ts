import connect from "@/lib/mongoose";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  if (req.method === "POST") {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: "Logged in successfully" });
    } else {
      res.status(403).json({ message: "User authentication failed" });
    }
  }
}
