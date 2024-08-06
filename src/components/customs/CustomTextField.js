import { TextField as MuiTextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(MuiTextField)(() => ({
  width: 400,
  '& .MuiInputBase-root': {
    borderBottom: '1px solid white',
    background: 'transparent',
    color: 'white',
    fontFamily: 'Bona Nova SC',
  },
  '& .MuiInputBase-input': {
    padding: '8px 16px',
    fontFamily: 'Bona Nova SC',
    textAlign: 'left',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
    fontFamily: 'Bona Nova SC',
  },
  '& .MuiInputLabel-shrink': {
    color: 'white',
    fontFamily: 'Bona Nova SC',
  },
  '& .MuiFormHelperText-root': {
    color: 'white',
    fontFamily: 'Bona Nova SC',
  },
  '& .MuiInputBase-input::-webkit-input-placeholder': {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Bona Nova SC',
  },
  '& .MuiInputBase-input:-ms-input-placeholder': {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Bona Nova SC',
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Bona Nova SC',
  },
  '& .MuiInput-underline:before': {
    borderBottom: '1px solid white',
  },
  '& .MuiInput-underline:after': {
    borderBottom: '1px solid white',
  },
}));

export default CustomTextField;
