import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import type { GameSummaryViewModel } from "../models/ui/summary";

interface GameDetailsContentProps {
  eventId: string | null;
  data: GameSummaryViewModel | undefined;
  isLoading: boolean;
  error: unknown;
}

export const GameDetailsContent = ({
  eventId,
  data,
  isLoading,
  error,
}: GameDetailsContentProps) => {
  if (!eventId) return <Typography>Select a game</Typography>;

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={180}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return <Alert severity="error">Failed to load game details.</Alert>;

  if (!data) return <Typography>No details available.</Typography>;

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6">{data.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {data.status ?? "Status unavailable"}
              {data.venue ? ` • ${data.venue}` : ""}
            </Typography>
          </Box>
          <Divider />
          {[data.away, data.home].map((t) => (
            <Stack
              key={t.abbr}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar src={t.logo} alt={t.abbr} />
                <Typography variant="subtitle1">{t.name}</Typography>
              </Stack>
              <Typography variant="h5">{t.score ?? "—"}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
