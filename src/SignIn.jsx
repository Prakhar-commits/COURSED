import { Box, Button, Card, TextField, Typography } from "@mui/material";
import React from "react";

export default function SignIn() {
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
            />
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
            <Button variant="contained" size="large">
              SignIn
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}
