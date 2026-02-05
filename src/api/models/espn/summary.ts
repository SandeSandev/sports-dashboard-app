import type { EspnCompetition } from "./shared";

export interface EspnSummaryHeader {
  shortName?: string;
  competitions?: EspnCompetition[];
  date?: string;
}

export interface EspnVenue {
  fullName?: string;
}

export interface EspnGameInfo {
  venue?: EspnVenue;
}

export interface EspnSummaryResponse {
  header?: EspnSummaryHeader;
  gameInfo?: EspnGameInfo;
}

export interface EspnGameSummary {
  eventId: string;
  title: string;
  status: string;
  venue?: string;
  date?: string;
  homeTeam?: {
    name: string;
    score: string;
  };
  awayTeam?: {
    name: string;
    score: string;
  };
}
