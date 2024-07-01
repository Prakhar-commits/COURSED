import connect from "@/lib/mongoose";
import Course from "@/models/Course";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  if (req.method === "GET") {
    const course = await Course.find({ published: true });
    res.json({ Courses: course });
  }

  if (req.method === "POST") {
    const { courseId } = req.query;
    const course = await Course.findById(courseId);
    if (course) {
      const user = await User.findById({ username: req.user?.username });
      if (user) {
        req.user?.purchasedCourses.push(course);
        await user.save();
        res.status(200).json({ message: "Course purchased successfully" });
      } else {
        res.status(400).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({ message: "Course could not be purchased" });
    }
  }
}
