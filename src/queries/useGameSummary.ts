import { useQuery } from "@tanstack/react-query";
import { buildEspnUrl } from "../api/helpers/espnUrl";
import { fetchJson } from "../api/helpers/fetchJson";
import { EspnGameSummaryApiResponse } from "../models/api/summary";
import { GameSummaryViewModel } from "../models/ui/summary";
import { mapSummaryToViewModel } from "../mappers/mapSummaryToViewModel";

export function useGameSummary(
  sport: "basketball" | "football",
  league: "nba" | "nfl",
  eventId: string | null,
  enabled: boolean,
) {
  return useQuery<GameSummaryViewModel>({
    queryKey: ["gameSummary", sport, league, eventId],
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
