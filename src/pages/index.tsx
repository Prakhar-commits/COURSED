import isUserLoadingState from "@/store/selectors/isUserLoading";
import userEmailState from "@/store/selectors/userEmail";

import { Button, Grid, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const userLoading = useRecoilValue(isUserLoadingState);

  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"}>Koursed Admin</Typography>
            <Typography variant={"h5"}>
              A place to learn, earn and grow
            </Typography>
            {!session.data && (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      signIn();
                    }}
                  >
                    Signup
                  </Button>
                </div>
                <div>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      signIn();
                    }}
                  >
                    Signin
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div></div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img
            src={
              "https://img.freepik.com/free-vector/empty-classroom-interior-with-chalkboard_1308-65378.jpg"
            }
            width={500}
            height={400}
            alt={"course-image"}
          />
        </Grid>
      </Grid>
    </div>
  );
}
