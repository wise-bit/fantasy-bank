import { Box } from "@mui/material";

const Landing = ({ username }) => {
  const isReady = false;

  if (!isReady) {
    return (
      <>
        <Box
          sx={{ fontSize: "48px", marginTop: "50px" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={"40vh"}
        >
          <Box>Website in progress...</Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{ fontSize: "48px", marginTop: "50px" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>Fantasy Bank</Box>
      </Box>
    </>
  );
};

export default Landing;
