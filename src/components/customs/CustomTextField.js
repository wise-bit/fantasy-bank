import { TextField as MuiTextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(MuiTextField)(() => ({
  width: 400, // Set a fixed width
  marginTop: "30px",
  "& .MuiInputBase-root": {
    borderBottom: "1px solid white", // Only bottom border
    backgroundColor: "transparent", // Transparent background
    marginTop: "10px",
    color: "white",
    fontFamily: "Bona Nova SC",
  },
  "& .MuiInputBase-input": {
    padding: "8px 16px", // Adjust padding if needed
  },
  "& .MuiInputLabel-root": {
    color: "white", // White label color
  },
  "& .MuiInputLabel-shrink": {
    color: "white", // White label color when shrunk
  },
  "& .MuiFormHelperText-root": {
    color: "white", // White helper text color
  },
  "& .MuiInputBase-input::-webkit-input-placeholder": {
    color: "white", // White placeholder text color
  },
  "& .MuiInputBase-input:-ms-input-placeholder": {
    color: "white", // White placeholder text color for IE
  },
  "& .MuiInputBase-input::placeholder": {
    color: "white", // White placeholder text color
  },
  "& .MuiInput-underline:before": {
    borderBottom: "1px solid white", // Only bottom border
  },
  "& .MuiInput-underline:after": {
    borderBottom: "1px solid white", // Only bottom border after focus
  },
}));

export default CustomTextField;
