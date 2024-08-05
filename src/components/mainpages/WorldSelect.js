import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Button, Typography, Box } from '@mui/material';

import CustomSelect from '../customs/CustomSelect';

const WorldSelect = ({
  worlds,
  selectedWorld,
  handleSetSelectedWorld,
  handleNext,
}) => {
  const [warningMessage, setWarningMessage] = useState('');

  const validateSelection = () => {
    if (!selectedWorld) {
      setWarningMessage('Please select a world before proceeding.');
    } else {
      setWarningMessage('');
      handleNext();
    }
  };

  return (
    <>
      <Box
        component='img'
        src={'res/fantasy_dragon.png'}
        alt='Fantasy Dragon Pixel Art'
        sx={{
          width: 250,
          imageRendering: 'pixelated',
          marginBottom: '70px',
        }}
      />
      <CustomSelect
        value={selectedWorld}
        onChange={(e) => handleSetSelectedWorld(e.target.value)}
        displayEmpty
      >
        <MenuItem value='' disabled>
          Select World...
        </MenuItem>
        {worlds.map((world, index) => (
          <MenuItem key={index} value={world}>
            {world}
          </MenuItem>
        ))}
      </CustomSelect>
      {warningMessage && (
        <Typography
          sx={{
            color: '#ff8f8f',
            fontFamily: 'Bona Nova SC',
            marginTop: '10px',
          }}
        >
          {warningMessage}
        </Typography>
      )}
      <Button
        onClick={validateSelection}
        sx={{
          color: 'black',
          fontFamily: 'Bona Nova SC',
          background: 'white',
          marginTop: '30px',
          width: '200px',
        }}
      >
        join
      </Button>
    </>
  );
};

WorldSelect.propTypes = {
  worlds: PropTypes.array,
  selectedWorld: PropTypes.string,
  handleSetSelectedWorld: PropTypes.func,
  handleNext: PropTypes.func,
};

export default WorldSelect;
