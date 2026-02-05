import { EspnScoreboardApiResponse } from "../models/api/scoreboard";
import { EspnLeague, LeagueLabel } from "../models/ui/scoreboard";

export const mapScoreboardsToViewModel = (
  data: EspnScoreboardApiResponse,
  league: EspnLeague,
) => {
  const leagueLabel: LeagueLabel= league === "nba" ? "NBA" : "NFL";
  const title =
    league === "nfl"
      ? `NFL — Week ${data.week?.number ?? "—"}`
      : `NBA — ${data.day?.date ?? "Today"}`;

  const games =
    data.events?.map((e) => {
      const comp = e.competitions?.[0];
      const competitors = comp?.competitors ?? [];
      const home = competitors.find((c) => c.homeAway === "home");
      const away = competitors.find((c) => c.homeAway === "away");

      const status = comp?.status?.type?.shortDetail ?? "N/A";

      return {
        id: e.id,
        status,
        venue: comp?.venue?.fullName,
        away: {
          abbr: away?.team.abbreviation ?? "AWAY",
          name: away?.team.displayName ?? "Away",
          logo: away?.team.logo,
          score: away?.score ? Number(away.score) : undefined,
          isWinner: away?.winner,
        },
        home: {
          abbr: home?.team.abbreviation ?? "HOME",
          name: home?.team.displayName ?? "Home",
          logo: home?.team.logo,
          score: home?.score ? Number(home.score) : undefined,
          isWinner: home?.winner,
        },
      };
    }) ?? [];

  return {
    league: leagueLabel,
    title,
    games,
  };
};
