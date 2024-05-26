import SignUp from "./SignUp";
import Appbar from "./Appbar";
import "./index.css";
import { Box } from "@mui/material";
import SignIn from "./SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
import CourseById from "./CourseById";

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
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseById />} />
            <Route path="/addcourse" element={<AddCourse />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
