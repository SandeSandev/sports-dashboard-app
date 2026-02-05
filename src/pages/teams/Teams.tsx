// src/features/teams/Teams.tsx (или където ти е удобно)
import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  List,
  ListItemText,
  Typography,
} from "@mui/material";

import { useTeams } from "../../queries/useTeams";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { DetailsModal } from "../../components/DetailsModal";
import { GameRow } from "../../components/GameRow";
import { TeamDetailsContent } from "../../components/TeamDetailsContent";

export const Teams = () => {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const league = useAppSelector((s) => s.league.name); // "nba" | "nfl"

  const sport = useMemo(
    () => (league === "nfl" ? "football" : "basketball"),
    [league],
  );

  const {
    data: teamsData,
    isError: isTeamsResponseError,
    isLoading: isLoadingTeamsData,
  } = useTeams(sport, league);

  const isModalOpen = Boolean(selectedTeamId);

  if (isLoadingTeamsData) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isTeamsResponseError) {
    return <Alert severity="error">Failed to load teams.</Alert>;
  }

  const teams = teamsData?.teams ?? [];

  if (teams.length === 0) {
    return <Typography>No teams found.</Typography>;
  }

  const selectedTeam = teams.find((t) => t.id === selectedTeamId);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {league.toUpperCase()} Teams
      </Typography>
      <List>
        {teams.map((team) => (
          <GameRow
            key={team.id}
            divider
            selected={team.id === selectedTeamId}
            onClick={() => setSelectedTeamId(team.id)}
          >
            <ListItemText primary={team.name} secondary={team.abbr} />
          </GameRow>
        ))}
      </List>
      <DetailsModal
        open={isModalOpen}
        title="Team details"
        onClose={() => setSelectedTeamId(null)}
      >
        <TeamDetailsContent team={selectedTeam ?? null} />
      </DetailsModal>
    </>
  );
};
