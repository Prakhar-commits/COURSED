import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Appbar() {
  const navigate = useNavigate();
  return (
    <Box
      style={{ display: "flex", justifyContent: "space-between", padding: 20 }}
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
