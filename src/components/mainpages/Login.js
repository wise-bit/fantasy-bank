import React from 'react';
import { Button } from '@mui/material';
import CustomTextField from '../customs/CustomTextField';

const Login = ({user, setUser, passcode, setPasscode, handleLogin, handleBack}) => {
  return (
    <>
      <CustomTextField
        label='Username'
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <CustomTextField
        label='4-digit passcode'
        type='password'
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
      />
      <Button
        onClick={handleLogin}
        sx={{
          color: 'black',
          fontFamily: 'Bona Nova SC',
          background: 'white',
          marginTop: '30px',
        }}
      >
        login
      </Button>
      <Button
        onClick={handleBack}
        sx={{
          color: 'black',
          fontFamily: 'Bona Nova SC',
          background: '#CCC',
          marginTop: '30px',
        }}
      >
        back
      </Button>
    </>
  );
};

export default Login;
