import { Box, Button, Card, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./config";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "./store/atoms/course";
import {
  courseDescription,
  courseDetails,
  courseTitle,
  isCourseLoading,
} from "./store/selectors/course";

export default function Courses() {
  const setCourses = useSetRecoilState(courseState);
  const courses = useRecoilValue(courseDetails);
  console.log(courses);
  const isLoading = useRecoilValue(isCourseLoading);
  const getCourses = async () => {
    const res = await axios.get(`${BASE_URL}/admin/courses/`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setCourses({
      isLoading: false,
      course: res.data.Courses,
    });
  };

  useEffect(() => {
    getCourses();
  }, []);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

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
  const { title, description, _id } = course;

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
          {title}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle1">
          {description}
        </Typography>
        {/* <img src={course.imageLink} style={{ width: 300 }}></img> */}
        <Box
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              navigate("/courses/" + _id);
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
