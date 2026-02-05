import type { EspnGameSummaryApiResponse } from "../models/api/summary";
import type { GameSummaryViewModel } from "../models/ui/summary";

export const mapSummaryToViewModel = (api: EspnGameSummaryApiResponse): GameSummaryViewModel => {
  const comp = api.header?.competitions?.[0];
  const competitors = comp?.competitors ?? [];

  const home = competitors.find((c) => c.homeAway === "home");
  const away = competitors.find((c) => c.homeAway === "away");

  return {
    title: api.header?.shortName ?? "Game details",
    status: comp?.status?.type?.shortDetail,
    venue: api.gameInfo?.venue?.fullName,

    away: {
      abbr: away?.team?.abbreviation ?? "AWAY",
      name: away?.team?.displayName ?? "Away",
      logo: away?.team?.logo,
      score: away?.score ? Number(away.score) : undefined,
    },

    home: {
      abbr: home?.team?.abbreviation ?? "HOME",
      name: home?.team?.displayName ?? "Home",
      logo: home?.team?.logo,
      score: home?.score ? Number(home.score) : undefined,
    },
  };
};