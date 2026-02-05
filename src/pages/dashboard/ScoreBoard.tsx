import { useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useGameSummary } from "../../queries/useGameSummary";
import { useScoreboard } from "../../queries/useScoreboard";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { DetailsDrawer } from "../../components/DetailsDrawer";
import { GameDetailsContent } from "../../components/GameDetailsContent";

export const ScoreBoard = () => {
  const league = useAppSelector((s) => s.league.league);
  const sport = league === "nfl" ? "football" : "basketball";

  const scoreboardQuery = useScoreboard(sport, league);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const open = !!selectedEventId;

  const summaryQuery = useGameSummary(sport, league, selectedEventId, open);

  if (scoreboardQuery.isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (scoreboardQuery.error) {
    return <Alert severity="error">Failed to load scoreboard.</Alert>;
  }

  const games = scoreboardQuery.data?.events ?? [];

  if (games.length === 0) {
    return <Typography>No games found.</Typography>;
  }

  return (
    <>
      <List>
        {games.map((game) => (
          <ListItem
            key={game.id}
            divider
            onClick={() => setSelectedEventId(game.id)}
          >
            <ListItemText
              primary={`${game.awayTeam.name} ${game.awayTeam.score} – ${game.homeTeam.score} ${game.homeTeam.name}`}
              secondary={game.status}
            />
          </ListItem>
        ))}
      </List>

      <DetailsDrawer
        open={open}
        title="Game details"
        onClose={() => setSelectedEventId(null)}
      >
        <GameDetailsContent
          eventId={selectedEventId}
          data={summaryQuery.data}
          isLoading={summaryQuery.isLoading}
          error={summaryQuery.error}
        />
      </DetailsDrawer>
    </>
  );
};