import React from 'react';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

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

Profile.propTypes = {
  username: PropTypes.string,
  balance: PropTypes.string,
  handleLogout: PropTypes.func,
};

export default Profile;
