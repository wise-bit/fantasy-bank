import { Box, Grid } from "@mui/material";

const Navbar = () => {
  return (
    <>
      <Box padding={2}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Box display="flex" justifyContent="flex-start"></Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              display="flex"
              justifyContent="center"
              sx={{ fontSize: "36px" }}
            >
              Fantasy Bank
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ fontSize: "24px" }}
            >
              79 GP
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Navbar;
