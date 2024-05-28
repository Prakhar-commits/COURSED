import mongoose from "mongoose";

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
  // price: String,
  // imageLink: String,
  // publised: Boolean,
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

export { User, Admin, Course };
