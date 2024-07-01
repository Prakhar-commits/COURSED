import connect from "@/lib/mongoose";
import Course from "@/models/Course";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  if (req.method === "POST") {
    const course = new Course(req.body);
    await course.save();
    res
      .status(200)
      .json({ message: "Course created successsfully", CourseId: course._id });
  }

  if (req.method === "GET") {
    const courses = await Course.find({});
    res.status(200).json({ Courses: courses });
  }

  if (req.method === "PUT") {
    const { courseId } = req.query;
    const course = await Course.findByIdAndUpdate(
      courseId as string,
      req.body,
      {
        new: true,
      }
    );
    if (course) {
      res.json({ message: "Course upddated succesfully", course });
    } else {
      res.json({ message: "Course not updated" });
    }
  }
}
