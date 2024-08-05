import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';

const Layout = ({ authed, bankTitle, func2 }) => {
  return (
    <Box>
      <Box sx={{ height: '10vh' }}>
        <Navbar
          authed={authed}
          bankTitle={bankTitle}
          func2={func2}
        />
      </Box>
      <Box sx={{ height: '80vh' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  totalBalance: PropTypes.number,
  bankTitle: PropTypes.string,
  func2: PropTypes.func,
};

export default Layout;
