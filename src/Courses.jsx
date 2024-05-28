import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const res = await axios.get("http://localhost:3000/admin/courses/", {
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
  return (
    <>
      <Box>
        <Card
          variant="elevation"
          style={{
            width: 300,
            height: 300,
          }}
        >
          <Typography variant="h4" fontWeight={100} textAlign={"center"}>
            {course.title}
          </Typography>
          <Typography variant="body1" fontWeight={50} textAlign={"center"}>
            {course.description}
          </Typography>
        </Card>
      </Box>
    </>
  );
}
