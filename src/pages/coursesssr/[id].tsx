import React, { useEffect, useState } from "react";

import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { Course, courseState } from "@/store/atoms/course";
import {
  courseDetailsState,
  coursePriceState,
  courseTitleState,
} from "@/store/selectors/course";
import { useRouter } from "next/router";

export default function CourseById() {
  const setCourse = useSetRecoilState(courseState);
  const course = useRecoilValue(courseDetailsState);
  const {
    query: { id },
  } = useRouter();

  const getCourseById = async () => {
    const response = await axios.get(`/api/admin/courses`);
    const courses: Course[] = response.data.Courses;
    const course = courses.find((course) => {
      return course._id === id;
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
  const title = useRecoilValue(courseTitleState);
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
  const title = useRecoilValue(courseTitleState);
  const price = useRecoilValue(coursePriceState);
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
            <b>Rs {price} </b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

function UpdateCourseCard() {
  const [courseDetails, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(courseDetails.course?.title);
  const [description, setDescription] = useState(
    courseDetails.course?.description
  );
  const [price, setPrice] = useState(courseDetails.course?.price);
  const courseId = courseDetails.course?._id;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card variant={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update course details
          </Typography>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          {/* <TextField
            value={image}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          /> */}
          <TextField
            value={price}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />
          {/* <Button
          style={{ marginTop: 20 }}
          variant="contained"
          size="large"
          onClick={async () => {
            const res = await axios.patch(
              `/api/admin/courses/`,
              {
                title: title,
                description: description,
                price: price,
                //   imageLink: here we will implement upload functionality
                //   published: will implement a checkbox functionalitiy,
              },
              {
                params: { courseId: courseDetails?.course?._id },
              }
            );
            let updatedCourse: Partial<Course>;
            if (courseDetails?.course?._id === courseId) {
              updatedCourse = {
                ...courseDetails.course,
                title: title,
                description: description,
                price: price,
                _id: courseId,
              };
            } else {
              updatedCourse = { ...course };
            }
            setCourse({ course: updatedCourse as Course, isLoading: false });
          }}
        >
          UPDATE COURSE
        </Button>
      </Card> */}
          <Button
            variant="contained"
            onClick={async () => {
              const res = await axios.patch(
                `/api/admin/courses/`,
                {
                  title: title,
                  description: description,
                  // imageLink: image,
                  // published: true,
                  price: price,
                },
                {
                  params: { courseId: courseDetails?.course?._id },
                }
              );
              let updatedCourse: Partial<Course>;

              updatedCourse = {
                ...courseDetails.course,
                title: title,
                description: description,
                price: price,
                _id: courseId,
              };

              setCourse({ course: updatedCourse as Course, isLoading: false });
            }}
          >
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}
