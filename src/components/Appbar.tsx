import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Box,
  Grid,
} from "@mui/material";

import { useSetRecoilState } from "recoil";
import userState from "@/store/atoms/user";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Appbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const session = useSession();
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  const drawerContent = (
    <Box
      onClick={() => {
        setDrawerOpen(!drawerOpen);
      }}
      sx={{ width: 250 }}
    >
      <List>
        {session.data ? (
          <>
            <ListItem onClick={() => router.replace("/")}>
              <ListItemText primary={session.data.user?.email} />
            </ListItem>
            <ListItem onClick={() => router.replace("/addcourse")}>
              <ListItemText primary="Add Course" />
            </ListItem>
            <ListItem onClick={() => router.replace("/coursesssr")}>
              <ListItemText primary="Courses" />
            </ListItem>
            <ListItem
              onClick={() => {
                setUser({
                  isLoading: false,
                  userEmail: null,
                });
                router.replace("/");
                signOut();
              }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem onClick={() => signIn()}>
              <ListItemText primary="SignUp" />
            </ListItem>
            <ListItem onClick={() => signIn()}>
              <ListItemText primary="SignIn" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Hidden smUp>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setDrawerOpen(!drawerOpen);
              }}
            >
              {/* <MenuIcon />  */}
              ICON HERE
            </IconButton>
            <Typography variant="h6">Koursed</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(!drawerOpen);
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>

      <Hidden smDown>
        <AppBar position="static">
          <Toolbar>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button onClick={() => router.replace("/")}>
                  <Typography variant="h6" color={"white"}>
                    {session.data ? session.data.user?.email : "Koursed"}
                  </Typography>
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={8}
                lg={9}
                container
                justifyContent="flex-end"
                alignItems="center"
              >
                {session.data ? (
                  <>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => router.replace("/addcourse")}
                        sx={{ marginRight: 2 }}
                      >
                        Add Course
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => router.replace("/coursesssr")}
                        sx={{ marginRight: 2 }}
                      >
                        Courses
                      </Button>
                    </Grid>
                    <Grid item>
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
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => signIn()}
                        sx={{ marginRight: 2 }}
                      >
                        SignUp
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" onClick={() => signIn()}>
                        SignIn
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Hidden>
    </>
  );
}
