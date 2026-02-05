import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { RefineThemedLayoutHeaderProps } from "@refinedev/mui";
import React, { useContext } from "react";
import { ColorModeContext } from "../contexts/color-mode";

export const Header: React.FC<RefineThemedLayoutHeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);

  return (
    <AppBar
      position={sticky ? "sticky" : "relative"}
      sx={{ backgroundColor: "#1d428a" }} 
    >
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          {/* Left side */}
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ESPN Dashboard
            </Typography>
          </Stack>

          {/* Right side */}
          <Stack direction="row" alignItems="center" gap={1}>
            <IconButton color="inherit" onClick={setMode}>
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
