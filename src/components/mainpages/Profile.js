import React from 'react';
import { Box, Button } from '@mui/material';

const Profile = ({ username, balance, handleLogout }) => {
  return (
    <>
      <Box>
        <p>Welcome, {username}!</p>
        <p>Your Fantasy Bank Balance: {balance} GP</p>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Button
          onClick={handleLogout}
          sx={{
            color: 'black',
            fontFamily: 'Bona Nova SC',
            background: '#CCC',
            marginTop: '30px',
          }}
        >
          logout
        </Button>
      </Box>
    </>
  );
};

export default Profile;
