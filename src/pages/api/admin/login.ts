import connect from "@/lib/mongoose";
import Admin from "@/models/Admin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  if (req.method === "POST") {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      res.json({ message: "Logged in successfully" });
    } else {
      res.json({ message: "Admin authentication failed" });
    }
  }
}
