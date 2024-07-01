import { Button, Card, Typography } from "@mui/material";

import axios from "axios";
import { useRouter } from "next/router.js";

import { Course as CourseType } from "@/store/atoms/course";

function Courses({ courses }: { courses: CourseType[] }) {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

function Course({ course }: { course: CourseType }) {
  const router = useRouter();

  return (
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
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            router.push("/coursesssr/" + course._id);
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}

export default Courses;

export async function getServerSideProps() {
  console.log("hit here");

  const response = await axios.get(`https://koursed.xyz/api/admin/courses`);

  console.log(response.data);

  return {
    props: {
      courses: response.data.Courses,
    },
  };
}
