import { Box, Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "./config";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Box style={{ padding: 20, display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">Welcome Back to Coursed</Typography>
      </Box>

      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <Box component="form" display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={async () => {
                const res = await axios.post(`${BASE_URL}/admin/login`, {
                  username: email,
                  password: password,
                });
                const data = res.data;
                localStorage.setItem("Bearer " + data.token);
                window.location("/");
              }}
            >
              SignIn
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}
