import { Box, Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  console.log(password);
  return (
    <>
      <Box style={{ padding: 20, display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">Welcome to Coursed</Typography>
      </Box>

      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <Box component="form" display="flex" flexDirection="column" gap={2}>
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              fullWidth={true}
              label="Email"
              variant="outlined"
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth={true}
              label="Password"
              variant="outlined"
            />
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                fetch("http://localhost:3000/admin/signup", {
                  method: "POST",
                  body: JSON.stringify({
                    username: email,
                    password: password,
                  }),
                  headers: {
                    "Content-type": "application/json",
                  },
                }).then((res) => {
                  res.json().then((data) => {
                    let token = data.token;
                    localStorage.setItem("token", token);
                  });
                });
              }}
            >
              Signup
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}
