const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCoures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  imageLink: String,
  publised: Boolean,
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

const generatejwt = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid id" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401);
  }
};
// console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.post("/admin/signup", async (req, res) => {
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

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = generatejwt(admin);
    res.json({ message: "Logged in successfully", token: token });
  } else {
    res.json({ message: "Admin authentication failed" });
  }
});

app.post("/admin/courses", authenticateJWT, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res
    .status(200)
    .json({ message: "Course created successfully", CourseId: course.id });
});

app.get("/admin/courses", authenticateJWT, async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({ Courses: courses });
});

app.put("/admin/courses/:courseId", authenticateJWT, async (req, res) => {
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

app.post("/users/signup", async (req, res) => {
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

app.post("/users/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = generatejwt(user);
    res.status(200).json({ message: "Logged in successfully", token: token });
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
});

app.get("/users/courses", authenticateJWT, async (req, res) => {
  const course = await Course.find({ published: true });
  res.json({ Courses: course });
});

app.post("/users/courses/:courseId", authenticateJWT, async (req, res) => {
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

app.get("/users/purchasedCoures", authenticateJWT, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCoures: user.purchasedCoures || [] });
  } else {
    res.json({ message: "User not found" });
  }
});

app.listen(3000, () => console.log("Server has started"));
