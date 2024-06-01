import SignUp from "./SignUp";
import Appbar from "./Appbar";
import "./index.css";
import { Box } from "@mui/material";
import SignIn from "./SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
import CourseById from "./CourseById";
import { Landing } from "./Landing";

function App() {
  return (
    <>
      <Box
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <BrowserRouter>
          <Appbar />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseById />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
