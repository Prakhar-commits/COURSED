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
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      res.status(400).json({ error: "Admin Already exists" });
    } else {
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      res.status(200).json({ message: "Admin Created successfullly" });
    }
  }
}
