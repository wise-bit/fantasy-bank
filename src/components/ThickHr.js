import { styled } from "@mui/material/styles";

const ThickSolidHr = styled("hr")(({ theme }) => ({
  border: "none",
  // borderTop: `5px solid ${theme.palette.divider}`,
  borderTop: "3px solid white",
  borderRadius: "16px",
  margin: theme.spacing(2, 0),
}));

const ThickDottedHr = styled("hr")(({ theme }) => ({
  border: "none",
  // borderTop: `5px solid ${theme.palette.divider}`,
  borderTop: "3px dotted white",
  borderRadius: "16px",
  margin: theme.spacing(2, 0),
}));

export { ThickSolidHr, ThickDottedHr };
