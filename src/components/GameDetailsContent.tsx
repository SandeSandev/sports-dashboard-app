import { Alert, CircularProgress, Typography } from "@mui/material";
import { EspnGameSummary } from "../api/models/espn/summary";

type Props = {
  eventId: string | null;
  data: EspnGameSummary | undefined;
  isLoading: boolean;
  error: unknown;
};

export const GameDetailsContent = ({ eventId, data, isLoading, error }: Props) => {
  if (!eventId) return <Typography>Select a game</Typography>;
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Failed to load game details.</Alert>;
  if (!data) return <Typography>No details available.</Typography>;

  return (
    <>
      <Typography variant="subtitle1">{data.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {data.venue}
      </Typography>
    </>
  );
};