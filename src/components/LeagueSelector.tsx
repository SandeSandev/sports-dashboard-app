import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { League, setLeague } from "../store/slices/leagueSlice";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { useAppSelector } from "../store/hooks/useAppSelector";

export const LeagueSelector = () => {
  const dispatch = useAppDispatch();
  const league = useAppSelector((s) => s.league.league);

  return (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <InputLabel id="league-label">League</InputLabel>
      <Select
        labelId="league-label"
        label="League"
        value={league}
        onChange={(e) => dispatch(setLeague(e.target.value as League))}
      >
        <MenuItem value="nfl">NBA</MenuItem>
        <MenuItem value="nba">NFL</MenuItem>
      </Select>
    </FormControl>
  );
};