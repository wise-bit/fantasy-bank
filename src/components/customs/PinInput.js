import React, { useRef } from 'react';
import { Box, InputBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const PinInputBase = styled(InputBase)(() => ({
  '& input': {
    textAlign: 'center',
    width: '40px',
    height: '40px',
    margin: '0 10px',
    fontSize: '24px',
    backgroundColor: 'transparent',
    borderBottom: '1px solid white',
    color: 'white',
    fontFamily: 'Bona Nova SC',
  },
}));

const PinInput = ({ value, onChange, label }) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9]?$/.test(val)) {
      const newValue = [...value];
      newValue[index] = val;
      onChange(newValue.join(''));

      // Move focus to the next input if current input is not empty and not the last input
      if (val && index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Typography
        sx={{
          color: 'white',
          fontFamily: 'Bona Nova SC',
        }}
      >
        {label}
      </Typography>
      <Box display='flex' justifyContent='center'>
        {Array(4)
          .fill('')
          .map((_, index) => (
            <PinInputBase
              key={index}
              value={value[index] || ''}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputProps={{
                maxLength: 1,
                ref: (el) => (inputsRef.current[index] = el),
              }}
            />
          ))}
      </Box>
    </Box>
  );
};

PinInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default PinInput;
