import { EspnEndpoint, EspnLeague, EspnSport } from "../../models/ui/scoreboard";

export const ESPN_BASE_URL =
  'https://site.api.espn.com/apis/site/v2/sports';


export function buildEspnUrl(
  sport: EspnSport,
  league: EspnLeague,
  endpoint: EspnEndpoint,
  eventId?: string
) {
  if (endpoint === 'summary') {
    return `${ESPN_BASE_URL}/${sport}/${league}/summary?event=${eventId}`;
  }

  return `${ESPN_BASE_URL}/${sport}/${league}/${endpoint}`;
}