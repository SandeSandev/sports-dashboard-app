import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../api/helpers/fetchJson";
import { buildEspnUrl } from "../api/helpers/espnUrl";
import type { EspnTeamsApiResponse } from "../models/api/teams";
import type { TeamsViewModel } from "../models/ui/teams";
import { mapTeamsToViewModel } from "../mappers/mapTeamsToViewModel";

export function useTeams(
  sport: "basketball" | "football",
  league: "nba" | "nfl"
) {
  return useQuery<TeamsViewModel>({
    queryKey: ["teams", sport, league],
    queryFn: async () => {
      const url = buildEspnUrl(sport, league, "teams");
      const dto = await fetchJson<EspnTeamsApiResponse>(url);
      return mapTeamsToViewModel(dto, league);
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}