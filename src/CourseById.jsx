import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Course } from "./Courses";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "./config";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "./store/atoms/course";
import { courseDetails, courseTitle } from "./store/selectors/course";

export default function CourseById() {
  const setCourse = useSetRecoilState(courseState);
  const course = useRecoilValue(courseDetails);
  const { courseId } = useParams();

  const getCourseById = async () => {
    const response = await axios.get(`${BASE_URL}/admin/courses`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const courses = response.data.Courses;
    const course = courses.find((course) => {
      return course._id === courseId;
    });
    setCourse({ isLoading: false, course: course });
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
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCourseCard />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        {/* <img src={course.imageLink} style={{ width: 350 }}></img> */}
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            {/* <b>Rs {price} </b> */}
          </Typography>
        </div>
      </Card>
    </div>
  );
}

function UpdateCourseCard() {
  const [courseDetails, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(courseDetails.course.title);
  const [description, setDescription] = useState(
    courseDetails.course.description
  );
  const [price, setPrice] = useState(courseDetails.course.price);
  const courseId = courseDetails.course._id;
  return (
    <>
      <Card
        variant="elevation"
        style={{ width: 400, padding: 20, marginTop: 30, marginLeft: 30 }}
      >
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

        <Button
          style={{ marginTop: 20 }}
          variant="contained"
          size="large"
          onClick={async () => {
            const res = await axios.put(
              `${BASE_URL}/admin/courses/` + courseDetails.course._id,
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
            if (courseDetails.course._id === courseId) {
              updatedCourse = {
                ...courseDetails.course,
                title: title,
                description: description,
                price: price,
                courseId: courseId,
              };
            } else {
              updatedCourse = { course };
            }
            setCourse({ course: updatedCourse, isLoading: false });
          }}
        >
          UPDATE COURSE
        </Button>
      </Card>
    </>
  );
}
