export interface EspnGameSummaryApiResponse {
  header?: {
    shortName?: string;
    competitions?: Array<{
      status?: { type?: { shortDetail?: string } };
      competitors?: Array<{
        homeAway: "home" | "away";
        score?: string;
        team?: {
          abbreviation: string;
          displayName: string;
          logo?: string;
        };
      }>;
    }>;
  };

  gameInfo?: {
    venue?: { fullName?: string };
  };
}