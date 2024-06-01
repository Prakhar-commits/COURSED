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
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./config";

function App() {
  const [useremail, setUserEmail] = useState(null);

  const settingUsername = async () => {
    const res = await axios.get(`${BASE_URL}/admin/me`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (res.data.username) {
      setUserEmail(res.data.username);
    }
  };

  useEffect(() => {
    settingUsername();
  }, []);

  return (
    <>
      <Box
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <BrowserRouter>
          <Appbar useremail={useremail} setUserEmail={setUserEmail} />
          <Routes>
            <Route
              path="/signin"
              element={<SignIn setUserEmail={setUserEmail} />}
            />
            <Route
              path="/signup"
              element={<SignUp setUserEmail={setUserEmail} />}
            />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseById />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/" element={<Landing useremail={useremail} />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
