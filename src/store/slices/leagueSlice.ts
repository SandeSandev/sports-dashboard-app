import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type League = "nba" | "nfl";

type LeagueState = {
  league: League;
};

const initialState: LeagueState = {
  league: "nba",
};

const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setLeague(state, action: PayloadAction<League>) {
      state.league = action.payload;
    },
  },
});

export const { setLeague } = leagueSlice.actions;
export default leagueSlice.reducer;