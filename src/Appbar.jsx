import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user";
import { isLoadingState, userEmailState } from "./store/selectors/user";

export default function Appbar() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const useremail = useRecoilValue(userEmailState);
  const isLoading = useRecoilValue(isLoadingState);

  if (isLoading) {
    return <></>;
  }

  if (useremail) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Box
          component={Button}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant="h6">Coursed</Typography>
        </Box>

        <Box display="flex">
          <Box style={{ marginRight: 20 }}>
            <Button
              onClick={() => {
                navigate("/addcourse");
              }}
            >
              Add Course
            </Button>
          </Box>
          <Box style={{ marginRight: 10 }}>
            <Button
              onClick={() => {
                navigate("/courses");
              }}
            >
              Courses
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.removeItem("token");
                setUser({
                  isLoading: false,
                  userEmail: null,
                });
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <Box
        component={Button}
        onClick={() => {
          navigate("/");
        }}
      >
        <Typography variant="h6">Coursed</Typography>
      </Box>

      <Box display="flex">
        <Box style={{ marginRight: 20 }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SignUp
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signin");
            }}
          >
            SignIn
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
