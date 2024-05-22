import SignUp from "./SignUp";
import Appbar from "./Appbar";
import "./index.css";
import { Box } from "@mui/material";
import SignIn from "./SignIn";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AddCourse from "./AddCourse";

function App() {
  return (
    <>
      <Box
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Appbar />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/addcourse" element={<AddCourse />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
