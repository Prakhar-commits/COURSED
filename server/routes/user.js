import express from "express";
import { Course, User } from "../db/index.js";
import { generatejwt, authenticateJWT } from "../middleware/auth.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).json({ message: "user already exists" });
  } else {
    const newUser = new User({ username, password });
    newUser.save();
    const token = generatejwt(newUser);
    res
      .status(200)
      .json({ message: "User created successfully", token: token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = generatejwt(user);
    res.status(200).json({ message: "Logged in successfully", token: token });
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
});

router.get("/courses", authenticateJWT, async (req, res) => {
  const course = await Course.find({ published: true });
  res.json({ Courses: course });
});

router.post("/courses/:courseId", authenticateJWT, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      req.user.purchasedCourses.push(course);
      await User.save();
      res.status(200).json({ message: "Course purchased successfully" });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } else {
    res.status(400).json({ message: "Course could not be purchased" });
  }
});

router.get("/purchasedCoures", authenticateJWT, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCoures: user.purchasedCoures || [] });
  } else {
    res.json({ message: "User not found" });
  }
});

export default router;
