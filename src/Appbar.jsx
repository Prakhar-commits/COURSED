import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Appbar() {
  const navigate = useNavigate();
  const [useremail, setUserEmail] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        // console.log(data);
        if (data.username) {
          setUserEmail(data.username);
        }

        // console.log(data.username);
      });
    });
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
        <Box>
          <Typography variant="h6">Coursed</Typography>
        </Box>
        <Box display="flex">
          <Box style={{ marginRight: 20 }}>{useremail}</Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.removeItem("token");
                window.location = "/register";
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
      <Box>
        <Typography variant="h6">Coursed</Typography>
      </Box>
      <Box display="flex">
        <Box style={{ marginRight: 20 }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/register");
            }}
          >
            SignUp
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/login");
            }}
          >
            SignIn
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
