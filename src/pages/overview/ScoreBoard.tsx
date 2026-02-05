import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
import { useGameSummary } from "../../queries/useGameSummary";
import { useScoreboard } from "../../queries/useScoreboard";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { DetailsModal } from "../../components/DetailsModal";
import { GameDetailsContent } from "../../components/GameDetailsContent";
import { GameRow } from "../../components/GameRow";

export const ScoreBoard = () => {
  const league = useAppSelector((s) => s.league.name); // "nfl" | "nba"
  const sport = useMemo(
    () => (league === "nfl" ? "football" : "basketball"),
    [league],
  );

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const isModalOpen = Boolean(selectedEventId);

  const {
    data: scoreBoardData,
    isLoading: isLoadingScoreBoardData,
    isError: isScoreBoardDataResponseError,
  } = useScoreboard(sport, league);

  const {
    data: gameSummaryData,
    isLoading: isLoadingGameSummary,
    isError: isGameSummaryResponseError,
  } = useGameSummary(sport, league, selectedEventId, isModalOpen);

  const games = scoreBoardData?.games ?? [];

  if (isLoadingScoreBoardData) {
    return (
      <Box display="flex" justifyContent="center" py={20}>
        <CircularProgress />
      </Box>
    );
  }

  if (isScoreBoardDataResponseError) {
    return <Alert severity="error">Failed to load scoreboard.</Alert>;
  }

  if (games.length === 0) {
    return <Typography>No games found.</Typography>;
  }

  return (
    <>
      <List>
        {games.map((g) => (
          <GameRow
            key={g.id}
            divider
            selected={g.id === selectedEventId}
            onClick={() => setSelectedEventId(g.id)}
          >
            <ListItemText
              primary={`${g.away.abbr} ${g.away.score ?? "—"} – ${
                g.home.score ?? "—"
              } ${g.home.abbr}`}
              secondary={g.status}
            />
          </GameRow>
        ))}
      </List>
      <DetailsModal
        open={isModalOpen}
        title="Game details"
        onClose={() => setSelectedEventId(null)}
      >
        <GameDetailsContent
          eventId={selectedEventId}
          data={gameSummaryData}
          isLoading={isLoadingGameSummary}
          error={isGameSummaryResponseError}
        />
      </DetailsModal>
    </>
  );
};
