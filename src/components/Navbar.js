import React from "react";
import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const Navbar = ({ totalBalance }) => {
  return (
    <>
      <Box padding={2}>
        <Grid container alignItems='center'>
          <Grid item xs={4}>
            <Box display='flex' justifyContent='flex-start'></Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              display='flex'
              justifyContent='center'
              sx={{ fontSize: '32px' }}
            >
              Fantasy Bank
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              display='flex'
              justifyContent='flex-end'
              sx={{ fontSize: '24px' }}
            >
              {totalBalance} gp
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Navbar.propTypes = {
  totalBalance: PropTypes.string,
};

export default Navbar;
