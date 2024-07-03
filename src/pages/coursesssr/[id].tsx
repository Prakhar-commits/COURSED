import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { Course, courseState } from "@/store/atoms/course";
import {
  courseDetailsState,
  courseImageState,
  coursePriceState,
  courseTitleState,
} from "@/store/selectors/course";
import { useRouter } from "next/router";
import DragAndDropImage from "@/components/ImageDragAndDrop";
import Image from "next/image";

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
      <Container maxWidth={false} disableGutters>
        <Grid container spacing={2}>
          <Grid item lg={8} md={12} sm={12}>
            <UpdateCourseCard />
          </Grid>
          <Grid item lg={4} md={12} sm={12}>
            <CourseCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitleState);
  return (
    <div
      style={{
        background: "#212121",
        top: 0,
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
          width: "100%",
        }}
      >
        <div>
          <Typography
            style={{
              color: "white",
              fontWeight: 600,
              wordBreak: "break-word",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
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
  const imageLink = useRecoilValue(courseImageState);
  // const published = useRecoilValue(coursePublished);
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
          width: "100%",
          maxWidth: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={imageLink} width={350} alt="course-image" />
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs {price} </b>
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs {} </b>
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
  const [imageLink, setImageLink] = useState(courseDetails.course?.imageLink);
  const [price, setPrice] = useState(courseDetails.course?.price);
  // const [published, setPublished] = useState(courseDetails.course?.published);
  const courseId = courseDetails.course?._id;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card variant={"outlined"} style={{ maxWidth: "100%", marginTop: 200 }}>
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

          <DragAndDropImage imageLink={imageLink} setImageLink={setImageLink} />
          <TextField
            value={price}
            style={{ marginBottom: 10, marginTop: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />

          <Button
            variant="contained"
            onClick={async () => {
              const res = await axios.patch(
                `/api/admin/courses/`,
                {
                  title: title,
                  description: description,
                  imageLink: imageLink,
                  // published: published,
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
              alert("Course has been updated");
            }}
          >
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}
