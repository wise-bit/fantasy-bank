import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import KnownWorlds from './mainpages/DataKnownWorlds';

const Navbar = ({ authed, bankTitle, func2 }) => {
  const imageSrc = KnownWorlds.find(
    (world) => world.name === bankTitle
  )?.imageName;

  return (
    <>
      <Box padding={2}>
        <Grid container alignItems='center'>
          <Grid item xs={2}>
            <Box display='flex' justifyContent='flex-start'>
              {imageSrc ? (
                <>
                  <Box
                    component='img'
                    src={imageSrc}
                    alt='Pixel Art'
                    sx={{
                      height: 30,
                      imageRendering: 'pixelated',
                      marginBottom: '30px',
                    }}
                  />
                </>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box
              display='flex'
              justifyContent='center'
              sx={{ fontSize: '32px' }}
            >
              {bankTitle ? bankTitle : 'Fantasy Bank'}
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display='flex' justifyContent='flex-end'>
              {authed ? (
                <Button
                  onClick={func2}
                  sx={{
                    color: 'black',
                    fontFamily: 'Bona Nova SC',
                    background: '#CCC',
                    fontSize: '14px',
                  }}
                >
                  logout
                </Button>
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Navbar.propTypes = {
  totalBalance: PropTypes.number,
};

export default Navbar;
