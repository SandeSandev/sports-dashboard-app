import type { EspnTeamsApiResponse } from "../models/api/teams";
import type { TeamsViewModel } from "../models/ui/teams";

export const mapTeamsToViewModel = (
  api: EspnTeamsApiResponse,
  league: "nba" | "nfl"
): TeamsViewModel => {
  const leagueLabel: "NBA" | "NFL" = league === "nba" ? "NBA" : "NFL";

  const teams =
    api.sports?.[0]?.leagues?.[0]?.teams?.map((t) => {
      const team = t.team;
      const logo = team.logos?.[0]?.href;

      return {
        id: team.id,
        abbr: team.abbreviation,
        name: team.displayName,
        logo,
      };
    }) ?? [];

  teams.sort((a, b) => a.abbr.localeCompare(b.abbr));

  return { league: leagueLabel, teams };
};