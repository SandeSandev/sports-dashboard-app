import { EspnEvent } from "./shared";

export interface EspnScoreboardResponse {
  events?: EspnEvent[];
}

export interface EspnScoreboardGame {
  id: string;
  status: string;
  homeTeam: {
    name: string;
    score: string;
  };
  awayTeam: {
    name: string;
    score: string;
  };
}

export interface EspnScoreboardResult {
  events: EspnScoreboardGame[];
}