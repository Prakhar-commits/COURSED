import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Course } from "./Courses";
import { Box, Button, Card, TextField, Typography } from "@mui/material";

export default function CourseById() {
  const [course, setCourse] = useState(null);

  const { courseId } = useParams();
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) =>
      res.json().then((data) => {
        const courses = data.courses;
        const course = courses.find((course) => {
          return course.courseId === parseInt(courseId);
        });
        setCourse(course);
      })
    );
  }, []);

  if (!course) {
    return (
      <Typography variant="h6" textAlign={"center"}>
        Course not found.
      </Typography>
    );
  }

  return (
    <>
      <CourseCard course={course} setCourse={setCourse} />
    </>
  );
}

function CourseCard({ course, setCourse }) {
  return (
    <>
      <Course course={course} />
      <UpdateCourseCard course={course} setCourse={setCourse} />
    </>
  );
}

function UpdateCourseCard({ course, setCourse }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const courseId = course.courseId;
  return (
    <>
      <Card variant="elevation" style={{ width: 400, padding: 20 }}>
        <Typography variant="h5">Update Course Details </Typography>
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
          />{" "}
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Price"
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
          />{" "}
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
        onClick={() => {
          fetch("http://localhost:3000/admin/courses/" + course.courseId, {
            method: "PUT",
            body: JSON.stringify({
              title: title,
              description: description,
              price: price,
              //   imageLink: here we will implement upload functionality
              //   published: will implement a checkbox functionalitiy,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }).then((res) =>
            res.json().then((data) => {
              let updatedCourse = {};

              if (course.courseId === courseId) {
                updatedCourse = {
                  title: title,
                  description: description,
                  price: price,
                  courseId: courseId,
                };
              } else {
                updatedCourse = { course };
              }
              console.log(updatedCourse);
              setCourse(updatedCourse);
            })
          );
        }}
      >
        UPDATE COURSE
      </Button>
    </>
  );
}
