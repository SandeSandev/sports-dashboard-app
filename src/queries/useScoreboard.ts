import { useQuery } from "@tanstack/react-query";
import {
  EspnScoreboardResponse,
  EspnScoreboardResult,
} from "../api/models/espn/scoreboard";
import { fetchJson } from "../api/helpers/fetchJson";

export function useScoreboard(
  sport: "basketball" | "football",
  league: "nba" | "nfl",
) {
  return useQuery<EspnScoreboardResult>({
    queryKey: ["scoreboard", sport, league],
    queryFn: async () => {
      const url = `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`;
      const data = await fetchJson<EspnScoreboardResponse>(url);

      const events =
        data.events?.map((e) => {
          const competitors = e.competitions?.[0]?.competitors ?? [];
          const home = competitors.find((c) => c.homeAway === "home");
          const away = competitors.find((c) => c.homeAway === "away");

          return {
            id: e.id,
            status: e.status?.type?.shortDetail ?? "N/A",
            homeTeam: {
              name: home?.team.displayName ?? "Home",
              score: home?.score ?? "-",
            },
            awayTeam: {
              name: away?.team.displayName ?? "Away",
              score: away?.score ?? "-",
            },
          };
        }) ?? [];

      return { events };
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
