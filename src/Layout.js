import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box>
      <Box sx={{ marginBottom: "50px" }} >
        <Navbar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
