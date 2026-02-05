export type EspnSport = "basketball" | "football";
export type EspnLeague = "nba" | "nfl";
export type LeagueLabel = "NBA" | "NFL";
export type EspnEndpoint = "scoreboard" | "teams" | "summary";

export interface ScoreboardViewModel {
  league: LeagueLabel;
  title: string; // "NBA — Today" | "NFL — Week 5"
  games: ScoreboardGameViewModel[];
}

export interface ScoreboardGameViewModel {
  id: string; // eventId
  status: string; // "Final", "Q3 02:14", "Sun 20:30"
  venue?: string;
  away: TeamViewModel;
  home: TeamViewModel;
}

export interface TeamViewModel {
  abbr: string;
  name: string;
  logo?: string;
  score?: number;
  isWinner?: boolean;
}
