import React, { useState } from 'react';
import { Box, Button, Snackbar, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import KnownPlayers from './DataKnownPlayers';
import CustomTextField from '../customs/CustomTextField';

const Profile = ({ username, balance, totalFunds, updateBalance }) => {
  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState(false);

  let imageSrc = KnownPlayers.find(
    (world) => world.name === username
  )?.imageLink;

  if (!imageSrc) {
    imageSrc = KnownPlayers.find((world) => world.name === 'default').imageLink;
  }

  const handleUpdateBalance = async (increment, amount) => {
    setAmount('');
    const success = await updateBalance(increment, amount);
    if (success) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      width={'300px'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
        <Box>
          <p>Greetings,</p>
          <Box
            sx={{ fontSize: '36px', marginTop: '-10px', marginBottom: '20px' }}
          >
            {username}
          </Box>
        </Box>
        {imageSrc ? (
          <>
            <Box
              component='img'
              src={imageSrc}
              alt='Profile Pixel Art'
              sx={{
                width: 250,
                imageRendering: 'pixelated',
                marginBottom: '30px',
                background: 'black',
                padding: '20px',
                borderRadius: '20px',
              }}
            />
          </>
        ) : null}
        <Box
          sx={{
            background: 'white',
            color: 'black',
            marginBottom: '20px',
            padding: '15px',
            borderRadius: '20px',
          }}
        >
          <Box>Accumulated Funds:</Box>
          <Box sx={{ fontSize: '32px' }}>{totalFunds} gp</Box>
        </Box>
        <Box
          sx={{
            background: '#b5c4c4',
            color: 'black',
            padding: '15px',
            borderRadius: '20px',
          }}
        >
          <Box>Contribution:</Box>
          <Box sx={{ fontSize: '32px' }}>{balance} gp</Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <CustomTextField
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ width: '300px', padding: '20px' }}
            placeholder='Amount'
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <Tooltip title='Withdrawal feature coming soon!'>
            <Button
              sx={{
                color: 'black',
                fontFamily: 'Bona Nova SC',
                background: 'white',
                fontSize: '16px',
                width: '120px',
              }}
            >
              Withdraw
            </Button>
          </Tooltip>
          <Button
            sx={{
              color: 'black',
              fontFamily: 'Bona Nova SC',
              background: 'white',
              fontSize: '16px',
              width: '120px',
            }}
            onClick={() => handleUpdateBalance(true, amount)}
          >
            Deposit
          </Button>
        </Box>
      </Box>

      <Box sx={{ marginTop: '30px', color: '#102423' }}>---</Box>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message='Balance updated successfully'
      />
    </Box>
  );
};

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  totalFunds: PropTypes.number.isRequired,
  updateBalance: PropTypes.func,
};

export default Profile;
