"use client";
import IconExitToApp from "@mui/icons-material/ExitToApp";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export interface AppBarProps {
  onLogoutClick?: () => void;
}

export function AppBar({ onLogoutClick }: AppBarProps) {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Herogram
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onLogoutClick}
          color="inherit"
        >
          <IconExitToApp />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}
