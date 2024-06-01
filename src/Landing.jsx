import { Box, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const Landing = ({ useremail }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <Box style={{ marginTop: 100 }}>
            <Typography variant={"h2"}>Coursed Admin</Typography>
            <Typography variant={"h5"}>
              A place to learn, earn and grow
            </Typography>

            {!useremail && (
              <Box style={{ display: "flex", marginTop: 20 }}>
                <Box style={{ marginRight: 10 }}>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </Button>
                </Box>
                <Box>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Signin
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          {/* <img /> */}
        </Grid>
      </Grid>
    </Box>
  );
};
