import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

const Layout = ({ totalBalance }) => {
  return (
    <Box>
      <Box sx={{ marginBottom: "50px" }}>
        <Navbar totalBalance={totalBalance} />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
