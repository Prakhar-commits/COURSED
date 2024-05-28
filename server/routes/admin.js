import { Admin, Course } from "../db/index.js";
import { generatejwt, authenticateJWT } from "../middleware/auth.js";
import express from "express";
const router = express.Router();

router.get("/me", authenticateJWT, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    res.status(400).json("Admin already exists");
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = generatejwt(newAdmin);
    res
      .status(200)
      .json({ message: "Admin created successfully", token: token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = generatejwt(admin);
    res.json({ message: "Logged in successfully", token: token });
  } else {
    res.json({ message: "Admin authentication failed" });
  }
});

router.post("/courses", authenticateJWT, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res
    .status(200)
    .json({ message: "Course created successfully", CourseId: course.id });
});

router.get("/courses", authenticateJWT, async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({ Courses: courses });
});

router.put("/courses/:courseId", authenticateJWT, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.json({ message: "Course could not be updated" });
  }
});

export default router;
