import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';

const Layout = ({ totalBalance }) => {
  return (
    <Box>
      <Box sx={{ height: '10vh' }}>
        <Navbar totalBalance={totalBalance} />
      </Box>
      <Box sx={{ height: '80vh' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  totalBalance: PropTypes.number,
};

export default Layout;
