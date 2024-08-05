import { Select, styled } from '@mui/material';

const CustomSelect = styled(Select)(() => ({
  width: 400, // Set a fixed width
  color: 'white',
  fontFamily: 'Bona Nova SC',
  borderBottom: '1px solid white', // Only bottom border

  '& .MuiSelect-select': {
    padding: '8px 16px',
    fontFamily: 'Bona Nova SC',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove other borders
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Ensure no border on hover
  },
  '& .MuiSvgIcon-root': {
    color: 'white', // White dropdown arrow
    fontFamily: 'Bona Nova SC',
  },
  '& .MuiPaper-root': {
    backgroundColor: 'white',
  },
  '& .MuiMenuItem-root': {
    fontFamily: 'Bona Nova SC',
  },
  backgroundColor: 'transparent', // Transparent background
}));

export default CustomSelect;
