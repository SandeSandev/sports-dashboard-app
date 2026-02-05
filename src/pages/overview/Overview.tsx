import { Box, Typography } from "@mui/material";
import { ScoreBoard } from "./ScoreBoard";

export const Overview = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5 }}>
        Recent games
      </Typography>
      <ScoreBoard />
    </Box>
  );
};
