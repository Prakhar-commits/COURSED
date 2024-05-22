import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function Appbar() {
  return (
    <Box
      style={{ display: "flex", justifyContent: "space-between", padding: 20 }}
    >
      <Box>
        <Typography variant="h6">Coursed</Typography>
      </Box>
      <Box display="flex">
        <Box style={{ marginRight: 20 }}>
          <Button variant="contained" >SignUp</Button>
        </Box>
        <Box>
          <Button variant="contained">SignIn</Button>
        </Box>
      </Box>
    </Box>
  );
}
