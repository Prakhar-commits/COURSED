const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use("/admin", adminRouter);
app.use("/user", userRouter);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.listen(3000, () => console.log("Server has started running at 3000 port"));
