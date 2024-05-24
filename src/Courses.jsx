import { Box, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) =>
      res.json().then((data) => {
        setCourses(data.courses);
        console.log(data.courses);
      })
    );
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
          return <Course key={course.courseId} course={course} />;
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
            {course.title} {course.courseId}
          </Typography>
          <Typography variant="body1" fontWeight={50} textAlign={"center"}>
            {course.description}
          </Typography>
        </Card>
      </Box>
    </>
  );
}
