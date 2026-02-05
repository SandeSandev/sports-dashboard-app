export interface GameSummaryViewModel {
  title: string;
  status?: string;
  venue?: string;
  away: TeamViewModel;
  home: TeamViewModel;
}

export interface TeamViewModel {
  abbr: string;
  name: string;
  logo?: string;
  score?: number;
}