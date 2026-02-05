export interface TeamsViewModel {
  league: "NBA" | "NFL";
  teams: TeamViewModel[];
}

export interface TeamViewModel {
  id: string;
  abbr: string;
  name: string;
  logo?: string;
}