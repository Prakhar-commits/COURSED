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
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./config";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user";

function App() {
  return (
    <>
      <RecoilRoot>
        <Box
          style={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <BrowserRouter>
            <Appbar />
            <InitUser />
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
      </RecoilRoot>
    </>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);

  const settingUsername = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.username) {
        setUser({
          isLoading: false,
          userEmail: res.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    settingUsername();
  }, []);
}

export default App;
