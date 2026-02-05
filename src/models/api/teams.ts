
export interface EspnTeamsApiResponse {
  sports?: Array<{
    leagues?: Array<{
      teams?: Array<{
        team: EspnTeamDto;
      }>;
    }>;
  }>;
}

export interface EspnTeamDto {
  id: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName?: string;
  logos?: Array<{
    href: string;
    width?: number;
    height?: number;
  }>;
}