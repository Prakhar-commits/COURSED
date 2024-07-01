import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  // imageLink: String,
  // publised: Boolean,
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
