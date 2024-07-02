import { Box, Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

import { useSetRecoilState } from "recoil";
import userState from "../store/atoms/user";
import { useRouter } from "next/router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  return (
    <>
      <Box style={{ padding: 20, display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">Welcome to Koursed</Typography>
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
              type="email"
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth={true}
              label="Password"
              variant="outlined"
              type="password"
            />
            <Button
              variant="contained"
              size="large"
              onClick={async () => {
                const res = await axios.post(
                  `/api/admin/signup`,
                  {
                    username: email,
                    password: password,
                  },
                  {
                    headers: {
                      "Content-type": "application/json",
                    },
                  }
                );
                // let token = res.data.token;
                // localStorage.setItem("token", token);
                setUser({
                  isLoading: false,
                  userEmail: email,
                });
                router.replace("/coursessr");
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
