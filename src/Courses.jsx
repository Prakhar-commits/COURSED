import { Box, Button, Card, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./config";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const res = await axios.get(`${BASE_URL}/admin/courses/`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setCourses(res.data.Courses);
    console.log(res.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <Box
        display={"flex"}
        gap={2}
        margin={2}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        {courses.map((course) => {
          return <Course key={course._id} course={course} />;
        })}
      </Box>
    </>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();
  return (
    <>
      <Card
        style={{
          margin: 10,
          width: 300,
          minHeight: 200,
          padding: 20,
        }}
      >
        <Typography textAlign={"center"} variant="h5">
          {course.title}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle1">
          {course.description}
        </Typography>
        {/* <img src={course.imageLink} style={{ width: 300 }}></img> */}
        <Box
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              navigate("/courses/" + course._id);
            }}
          >
            Edit
          </Button>
        </Box>
      </Card>
      ;
    </>
  );
}
