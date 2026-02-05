import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { League, setLeague } from "../store/slices/leagueSlice";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { useAppSelector } from "../store/hooks/useAppSelector";

export const LeagueSelector = () => {
  const dispatch = useAppDispatch();
  const league = useAppSelector((s) => s.league.name);

  return (
    <FormControl size="small" variant="outlined" sx={{ minWidth: 160 }}>
      <InputLabel
        id="league-label"
        sx={{
          color: "common.white",
          "&.Mui-focused": {
            color: "common.white",
          },
          "&.MuiInputLabel-shrink": {
            color: "common.white",
          },
        }}
      >
        League
      </InputLabel>
      <Select
        labelId="league-label"
        label="League"
        value={league}
        onChange={(e) => dispatch(setLeague(e.target.value as League))}
        sx={{
          color: "common.white",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.6)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "common.white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "common.white",
          },
          "& .MuiSvgIcon-root": {
            color: "common.white",
          },
        }}
      >
        <MenuItem value="nba">NBA</MenuItem>
        <MenuItem value="nfl">NFL</MenuItem>
      </Select>
    </FormControl>
  );
};
