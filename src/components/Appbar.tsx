import { Box, Button, Typography } from "@mui/material";

import { useRecoilValue, useSetRecoilState } from "recoil";

import userState from "@/store/atoms/user";
import { useRouter } from "next/router";
import isUserLoadingState from "@/store/selectors/isUserLoading";
import userEmailState from "@/store/selectors/userEmail";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Appbar() {
  const session = useSession();
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const useremail = useRecoilValue(userEmailState);
  const isLoading = useRecoilValue(isUserLoadingState);

  // if (isLoading) {
  //   return <></>;
  // }
  console.log(session);

  console.log(isLoading, useremail);

  if (session.data) {
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
            router.push("/");
          }}
        >
          <Typography variant="h6">{session.data?.user?.email}</Typography>
        </Box>

        <Box display="flex">
          <Box style={{ marginRight: 20 }}>
            <Button
              onClick={() => {
                router.push("/addcourse");
              }}
            >
              Add Course
            </Button>
          </Box>
          <Box style={{ marginRight: 10 }}>
            <Button
              onClick={() => {
                router.push("/coursesssr");
              }}
            >
              Courses
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                setUser({
                  isLoading: false,
                  userEmail: null,
                });
                router.replace("/");
                signOut();
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
          router.push("/");
        }}
      >
        <Typography variant="h6">Koursed</Typography>
      </Box>

      <Box display="flex">
        <Box style={{ marginRight: 20 }}>
          <Button
            variant="contained"
            onClick={() => {
              // router.push("/signup");
              signIn();
            }}
          >
            SignUp
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              // router.push("/signin");
              signIn();
            }}
          >
            SignIn
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
