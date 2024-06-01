import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";

export default function Appbar() {
  const navigate = useNavigate();
  const [useremail, setUserEmail] = useState(null);

  const settingUsername = async () => {
    const res = await axios.get(`${BASE_URL}/admin/me`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (res.data.username) {
      setUserEmail(res.data.username);
      console.log(res.data.username);
    }
  };

  useEffect(() => {
    settingUsername();
  }, []);

  if (useremail) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Box
          component={Button}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant="h6">Coursed</Typography>
        </Box>

        <Box display="flex">
          <Box style={{ marginRight: 20 }}>
            <Button
              onClick={() => {
                navigate("/addcourse");
              }}
            >
              Add Course
            </Button>
          </Box>
          <Box style={{ marginRight: 10 }}>
            <Button
              onClick={() => {
                navigate("/courses");
              }}
            >
              Courses
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <Box
        component={Button}
        onClick={() => {
          navigate("/");
        }}
      >
        <Typography variant="h6">Coursed</Typography>
      </Box>

      <Box display="flex">
        <Box style={{ marginRight: 20 }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SignUp
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signin");
            }}
          >
            SignIn
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
