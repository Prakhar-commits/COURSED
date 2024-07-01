import connect from "@/lib/mongoose";
import { User } from "@/models/User";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  if (req.method === "POST") {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      res.status(200).json({ message: "User created successfully" });
    }
  }
}
