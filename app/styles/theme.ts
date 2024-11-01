import { createTheme } from "@mui/material/styles";

import { poppinsFont } from "@/app/styles/fonts";

export const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    allVariants: {
      fontFamily: poppinsFont.style.fontFamily,
    },
  },
});
