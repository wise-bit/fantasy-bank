import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Button, Typography } from '@mui/material';

import CustomSelect from '../customs/CustomSelect';

const WorldSelect = ({ worlds, selectedWorld, setSelectedWorld, handleNext }) => {
  const [warningMessage, setWarningMessage] = useState('');

  const validateSelection = () => {
    if (!selectedWorld) {
      setWarningMessage('Please select a world before proceeding.');
    } else {
      setWarningMessage('');
      handleNext();
    }
  }

  return (
    <>
      <CustomSelect
        value={selectedWorld}
        onChange={(e) => setSelectedWorld(e.target.value)}
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
          width: '300px',
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
  setSelectedWorld: PropTypes.func,
  handleNext: PropTypes.func,
};

export default WorldSelect;
