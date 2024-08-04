import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const NoMatch = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      // height="70vh"
      sx={{ paddingTop: '50px' }}
    >
      <Box textAlign='center'>
        <Box sx={{ fontSize: '48px' }}>404</Box>
        <Box sx={{ fontSize: '32px' }}>Page Not Found</Box>
        <Button
          variant='contained'
          color='success'
          component={Link}
          to='/'
          sx={{ marginTop: '40px', fontFamily: 'Bona Nova SC' }}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
};

export default NoMatch;
