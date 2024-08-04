import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';

Layout.propTypes = {
  totalBalance: PropTypes.string,
};

const Layout = ({ totalBalance }) => {
  return (
    <Box>
      <Box sx={{ marginBottom: '50px' }}>
        <Navbar totalBalance={totalBalance} />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
