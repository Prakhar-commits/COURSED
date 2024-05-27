import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// const adminRouter = require("./routes/admin");
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
// const userRouter = require("./routes/user");

app.use("/admin", adminRouter);
app.use("/user", userRouter);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.listen(3000, () => console.log("Server has started running at 3000 port"));
