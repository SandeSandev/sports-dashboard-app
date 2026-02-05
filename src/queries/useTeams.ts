import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../api/helpers/fetchJson";
import { buildEspnUrl } from "../api/helpers/espnUrl";
import type { EspnTeamsApiResponse } from "../models/api/teams";
import type { TeamsViewModel } from "../models/ui/teams";
import { mapTeamsToViewModel } from "../mappers/mapTeamsToViewModel";
import { EspnLeague, EspnSport } from "../models/ui/scoreboard";

export const TEAMS_QUERY_KEY = "teams";

export function useTeams(sport: EspnSport, league: EspnLeague) {
  return useQuery<TeamsViewModel>({
    queryKey: [TEAMS_QUERY_KEY, sport, league],
    queryFn: async () => {
      const url = buildEspnUrl(sport, league, "teams");
      const dto = await fetchJson<EspnTeamsApiResponse>(url);
      return mapTeamsToViewModel(dto, league);
    },
    staleTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
