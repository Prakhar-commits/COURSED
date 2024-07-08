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

    try {
      await course.save();
      res.status(200).json({
        message: "Course created successsfully",
        CourseId: course._id,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  if (req.method === "GET") {
    const { courseId } = req.query;

    try {
      if (courseId) {
        const courseById = await Course.findById(courseId);
        if (courseById) {
          res.status(200).json({ Course: courseById });
        } else {
          res.status(400).json({ Course: null });
        }
      } else {
        const courses = await Course.find({});
        res.status(200).json({ Courses: courses });
      }
    } catch (e) {
      res.status(400).json({ message: "Course not found", status: false });
    }
  }

  if (req.method === "PATCH") {
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
