import { useQuery } from "@tanstack/react-query";
import { buildEspnUrl } from "../api/helpers/espnUrl";
import { fetchJson } from "../api/helpers/fetchJson";
import { EspnGameSummaryApiResponse } from "../models/api/summary";
import { GameSummaryViewModel } from "../models/ui/summary";
import { mapSummaryToViewModel } from "../mappers/mapSummaryToViewModel";
import { EspnLeague, EspnSport } from "../models/ui/scoreboard";

export const GAME_SUMMARY_QUERY_KEY = "gameSummary";

export function useGameSummary(
  sport: EspnSport,
  league: EspnLeague,
  eventId: string | null,
  enabled: boolean,
) {
  return useQuery<GameSummaryViewModel>({
    queryKey: [GAME_SUMMARY_QUERY_KEY, sport, league, eventId],
    enabled: enabled && !!eventId,
    queryFn: async () => {
      const url = buildEspnUrl(sport, league, "summary", eventId ?? "");
      const data = await fetchJson<EspnGameSummaryApiResponse>(url);
      return mapSummaryToViewModel(data);
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
