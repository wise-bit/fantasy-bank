import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Button } from '@mui/material';

import CustomSelect from '../customs/CustomSelect';

const WorldSelect = ({ worlds, selectedWorld, setSelectedWorld, handleNext }) => {
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
      <Button
        onClick={handleNext}
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
