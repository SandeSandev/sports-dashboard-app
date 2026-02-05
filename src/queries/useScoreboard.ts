import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../api/helpers/fetchJson";
import { buildEspnUrl } from "../api/helpers/espnUrl";
import type {
  EspnLeague,
  EspnSport,
  ScoreboardViewModel,
} from "../models/ui/scoreboard";
import type { EspnScoreboardApiResponse } from "../models/api/scoreboard";
import { mapScoreboardsToViewModel } from "../mappers/mapScoreboardToViewModel";

export const SCOREBOARD_QUERY_KEY = "scoreboard";

export function useScoreboard(sport: EspnSport, league: EspnLeague) {
  return useQuery<ScoreboardViewModel>({
    queryKey: [SCOREBOARD_QUERY_KEY, sport, league],
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
