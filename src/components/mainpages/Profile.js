import React, { useState } from 'react';
import { Box, Button, Snackbar, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import KnownPlayers from './DataKnownPlayers';
import CustomTextField from '../customs/CustomTextField';
import CustomCircularButton from '../customs/CustomCircularButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = ({
  username,
  balance,
  loan,
  totalFunds,
  selectedWorld,
  updateBalance,
  updateLoan,
  handleLogin,
  goToShop,
}) => {
  const [balanceAmount, setBalanceAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [open, setOpen] = useState(false);

  let imageSrc = KnownPlayers.find(
    (player) => player.name === username
  )?.imageLink;

  if (!imageSrc) {
    imageSrc = KnownPlayers.find(
      (player) => player.name === 'default'
    ).imageLink;
  }

  const pushBlockchain = async (amount, sender, recipient) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      sender: sender,
      recipient: recipient,
      amount: amount,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      fetch(
        process.env.REACT_APP_PERSONAL_BLOCKCHAIN_API_URL + '/transactions/new',
        requestOptions
      )
        .then((response) => response.text())
        .then((_result) => {})
        .catch((_error) => {});
    } catch (error) {
      console.error('Error pushing transaction to blockchain:', error);
    }
  };

  const handleUpdateBalance = async (increment, amount) => {
    const success = await updateBalance(increment, amount);
    if (success) {
      setBalanceAmount('');
      setOpen(true);
      pushBlockchain(amount, username, selectedWorld);
    }
  };

  const handleUpdateLoan = async (amount) => {
    const success = await updateLoan(amount);
    if (success) {
      setLoanAmount('');
      setOpen(true);
      pushBlockchain(amount, selectedWorld, username);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = async () => {
    await handleLogin();
    window.location.reload();
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
      {/* goToShop */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignContent: 'end',
          justifyContent: 'end',
          marginBottom: '20px',
        }}
      >
        <Button
          onClick={goToShop}
          sx={{
            width: '100%',
            color: 'black',
            background: 'white',
            fontFamily: 'Bona Nova SC',
            fontSize: '14px',
            fontWeight: '700',
          }}
        >
          shop
        </Button>
      </Box>

      <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
        {/* Profile Info */}

        <Box>
          <p>Greetings,</p>
          <Box
            sx={{ fontSize: '36px', marginTop: '-10px', marginBottom: '20px' }}
          >
            {username}
          </Box>
        </Box>

        {/* Profile Picture */}

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

        {/* Wealth Info */}

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
          <Box sx={{ fontSize: '32px' }}>
            {balance} (-{loan}) gp
          </Box>
        </Box>

        <Box
          display={'flex'}
          flexDirection={'row'}
          sx={{
            marginTop: '20px',
            width: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <CustomCircularButton onClick={() => handleRefresh()}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </CustomCircularButton>
        </Box>

        {/* Balance Update Components */}

        <Box
          sx={{
            background: 'black',
            padding: '20px',
            borderRadius: '20px',
            marginTop: '30px',
            textAlign: 'center',
          }}
        >
          <Box>Manage funds</Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomTextField
              type='number'
              value={balanceAmount}
              onChange={(e) => setBalanceAmount(e.target.value)}
              sx={{ width: '300px', padding: '20px', marginTop: '10px' }}
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
              onClick={() => handleUpdateBalance(true, balanceAmount)}
            >
              Deposit
            </Button>
          </Box>
        </Box>

        {/* Loan Components */}

        <Box
          sx={{
            background: 'black',
            padding: '20px',
            borderRadius: '20px',
            marginTop: '30px',
            textAlign: 'center',
          }}
        >
          <Box>Get A Loan</Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomTextField
              type='number'
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              sx={{ width: '300px', padding: '20px', marginTop: '10px' }}
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
            <Button
              sx={{
                color: 'black',
                fontFamily: 'Bona Nova SC',
                background: 'white',
                fontSize: '16px',
                width: '120px',
              }}
              onClick={() => handleUpdateLoan(loanAmount)}
            >
              Loan
            </Button>
          </Box>
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
  loan: PropTypes.number.isRequired,
  totalFunds: PropTypes.number.isRequired,
  selectedWorld: PropTypes.string.isRequired,
  updateBalance: PropTypes.func,
  updateLoan: PropTypes.func,
  handleLogin: PropTypes.func,
  goToShop: PropTypes.func,
};

export default Profile;
