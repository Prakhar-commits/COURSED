import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  purchasedCoures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };
