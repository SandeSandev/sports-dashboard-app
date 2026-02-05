export interface EspnTeam {
  id: string;
  displayName: string;
  abbreviation?: string;
  location?: string;
  shortDisplayName?: string;
  color?: string;
  logos?: EspnLogo[];
}

export interface EspnLogo {
  href: string;
}

export interface EspnCompetitor {
  homeAway: "home" | "away";
  score?: string;
  team: EspnTeam;
}

export interface EspnStatusType {
  shortDetail?: string;
}

export interface EspnStatus {
  type?: EspnStatusType;
}

export interface EspnCompetition {
  competitors: EspnCompetitor[];
  status?: EspnStatus;
  date?: string;
}

export interface EspnEvent {
  id: string;
  status?: EspnStatus;
  competitions?: EspnCompetition[];
}