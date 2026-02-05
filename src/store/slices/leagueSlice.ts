import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type League = "nba" | "nfl";

type LeagueState = {
  name: League;
};

const initialState: LeagueState = {
  name: "nba",
};

const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setLeague(state, action: PayloadAction<League>) {
      state.name = action.payload;
    },
  },
});

export const { setLeague } = leagueSlice.actions;
export default leagueSlice.reducer;