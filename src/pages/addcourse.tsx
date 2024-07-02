import { Box, Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imagelink, setImageLink] = useState("");
  const [published, setPublished] = useState("");
  const router = useRouter();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Box>
        <Typography variant="h6">Enter Course Details</Typography>
      </Box>

      <Card variant="elevation" style={{ width: 400, padding: 20 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Price"
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
          />
          {/* <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Image Link"
            variant="outlined"
          />{" "}
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Published"
            variant="outlined"
          /> */}
        </Box>
      </Card>
      <Button
        variant="contained"
        size="large"
        onClick={async () => {
          const res = await axios.post(`/api/admin/courses`, {
            title: title,
            description: description,
            price: price,
            //   imageLink: here we will implement upload functionality
            //   publised: will implement a checkbox functionalitiy,
          });
          alert("Course has been Added");
          router.replace("/coursesssr");
        }}
      >
        ADD COURSE
      </Button>
    </Box>
  );
}
