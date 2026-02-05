import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../api/helpers/fetchJson";
import { buildEspnUrl } from "../api/helpers/espnUrl";
import type { ScoreboardViewModel } from "../models/ui/scoreboard";
import type { EspnScoreboardApiResponse } from "../models/api/scoreboard";
import { mapScoreboardsToViewModel } from "../mappers/mapScoreboardToViewModel";

export function useScoreboard(
  sport: "basketball" | "football",
  league: "nba" | "nfl",
) {
  return useQuery<ScoreboardViewModel>({
    queryKey: ["scoreboard", sport, league],
    queryFn: async () => {
      const url = buildEspnUrl(sport, league, "scoreboard");
      const data = await fetchJson<EspnScoreboardApiResponse>(url);

      return mapScoreboardsToViewModel(data, league);
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
