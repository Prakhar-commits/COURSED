import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Course } from "./Courses";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";

export default function CourseById() {
  const [course, setCourse] = useState(null);

  const { courseId } = useParams();

  const getCourseById = async () => {
    const response = await axios.get("http://localhost:3000/admin/courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const courses = response.data.Courses;
    const course = courses.find((course) => {
      return course._id === courseId;
    });
    setCourse(course);
  };

  useEffect(() => {
    getCourseById();
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
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const courseId = course._id;
  return (
    <>
      <Card variant="elevation" style={{ width: 400, padding: 20 }}>
        <Typography variant="h5">Update Course Details </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            value={title}
            fullWidth={true}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            value={description}
            fullWidth={true}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />{" "}
          <TextField
            value={price}
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
        onClick={async () => {
          const res = await axios.put(
            "http://localhost:3000/admin/courses/" + course._id,
            {
              title: title,
              description: description,
              price: price,
              //   imageLink: here we will implement upload functionality
              //   published: will implement a checkbox functionalitiy,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          let updatedCourse = {};
          if (course._id === courseId) {
            updatedCourse = {
              ...course,
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
        }}
      >
        UPDATE COURSE
      </Button>
    </>
  );
}
