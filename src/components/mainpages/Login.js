import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import KnownWorlds from './DataKnownWorlds';
import PinInput from '../customs/PinInput';
import CustomTextField from '../customs/CustomTextField';

const Login = ({
  user,
  setUser,
  passcode,
  setPasscode,
  handleLogin,
  handleBack,
  selectedWorld,
}) => {
  const [warningMessage, setWarningMessage] = useState('');

  const imageSrc = KnownWorlds.find(
    (world) => world.name === selectedWorld
  )?.imageName;

  const checkLogin = async () => {
    const success = await handleLogin();
    if (!success) {
      setWarningMessage('Incorrect username or passcode, please try again!');
    } else {
      setWarningMessage('');
    }
  };

  return (
    <>
      {imageSrc ? (
        <>
          <Box
            component='img'
            src={imageSrc}
            alt='Pixel Art'
            sx={{
              width: 250,
              imageRendering: 'pixelated',
              marginBottom: '30px',
            }}
          />
          <Box
            sx={{
              marginBottom: '50px',
              fontSize: '24px',
            }}
          >
            welcome back!
          </Box>
        </>
      ) : null}
      <CustomTextField
        label='Username'
        value={user}
        onChange={(e) => setUser(e.target.value)}
        sx={{ marginBottom: '30px', marginTop: '30px', }}
      />
      <Box sx={{ padding: '20px', background: 'black', borderRadius: '16px' }}>
        <PinInput
          value={passcode}
          onChange={setPasscode}
          label='4-digit passcode'
        />
      </Box>
      {warningMessage && (
        <Typography
          sx={{
            color: '#ff8f8f',
            fontFamily: 'Bona Nova SC',
            marginTop: '30px',
          }}
        >
          {warningMessage}
        </Typography>
      )}
      <Button
        onClick={checkLogin}
        sx={{
          color: 'black',
          fontFamily: 'Bona Nova SC',
          background: 'white',
          marginTop: '30px',
          width: '280px',
        }}
      >
        login
      </Button>
      <Button
        onClick={handleBack}
        sx={{
          color: 'black',
          fontFamily: 'Bona Nova SC',
          background: '#EEE',
          marginTop: '30px',
        }}
      >
        back
      </Button>
    </>
  );
};

Login.propTypes = {
  user: PropTypes.string,
  setUser: PropTypes.func,
  passcode: PropTypes.string,
  setPasscode: PropTypes.func,
  handleLogin: PropTypes.func,
  handleBack: PropTypes.func,
  selectedWorld: PropTypes.string,
};

export default Login;
