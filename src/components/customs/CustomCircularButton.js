import { IconButton, styled } from '@mui/material';

const CustomCircularButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  backgroundColor: 'black', // theme.palette.primary.main
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default CustomCircularButton;
