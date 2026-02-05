export interface EspnScoreboardApiResponse {
  events: EspnScoreboardEvent[];
  week?: { number: number }; // NFL only
  day?: { date: string };    // NBA only
}

export interface EspnScoreboardEvent {
  id: string;        // eventId
  name: string;      // "Lakers at Celtics"
  shortName?: string; // "LAL @ BOS"
  date: string;
  competitions: EspnCompetition[];
}

export interface EspnCompetition {
  venue?: { fullName?: string };
  competitors: EspnCompetitor[];
  status: EspnStatus;
}

export interface EspnCompetitor {
  homeAway: "home" | "away";
  score?: string;
  winner?: boolean;
  team: {
    abbreviation: string; // "LAL", "NE"
    displayName: string;
    logo?: string;
  };
}

export interface EspnStatus {
  type: {
    state: "pre" | "in" | "post";
    shortDetail?: string; // "Final", "Q4 01:22", "Sun 20:30"
  };
}