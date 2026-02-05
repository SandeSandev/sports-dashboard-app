import { Avatar, Box, Stack, Typography } from "@mui/material";
import type { TeamViewModel } from "../models/ui/teams";

interface TeamDetailsContentProps {
  team: TeamViewModel | null;
}

export const TeamDetailsContent = ({ team }: TeamDetailsContentProps) => {
  if (!team) {
    return <Typography>Select a team</Typography>;
  }

  return (
    <Stack spacing={2} alignItems="center" textAlign="center">
      <Avatar src={team.logo} alt={team.abbr} sx={{ width: 64, height: 64 }} />

      <Box>
        <Typography variant="h6" fontWeight={700}>
          {team.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {team.abbr}
        </Typography>
      </Box>
    </Stack>
  );
};