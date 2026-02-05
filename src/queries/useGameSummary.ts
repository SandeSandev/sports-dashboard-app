import { useQuery } from "@tanstack/react-query";
import { buildEspnUrl } from "../api/espn.url";
import { fetchJson } from "../api/helpers/fetchJson";
import { EspnGameSummary, EspnSummaryResponse,  } from "../api/models/espn/summary";

export function useGameSummary(
  sport: "basketball" | "football",
  league: "nba" | "nfl",
  eventId: string | null,
  enabled: boolean
) {
  return useQuery<EspnGameSummary>({
    queryKey: ["gameSummary", sport, league, eventId],
    enabled: enabled && !!eventId,
    queryFn: async () => {
      const url = buildEspnUrl(sport, league, "summary", eventId ?? "");
      const data = await fetchJson<EspnSummaryResponse>(url);

      const competition = data.header?.competitions?.[0];
      const competitors = competition?.competitors ?? [];
      const home = competitors.find((c) => c.homeAway === "home");
      const away = competitors.find((c) => c.homeAway === "away");

      return {
        eventId: eventId ?? "",
        title: data.header?.shortName ?? "Game details",
        status: competition?.status?.type?.shortDetail ?? "N/A",
        venue: data.gameInfo?.venue?.fullName,
        date: competition?.date ?? data.header?.date,
        homeTeam: home
          ? { name: home.team.displayName, score: home.score ?? "-" }
          : undefined,
        awayTeam: away
          ? { name: away.team.displayName, score: away.score ?? "-" }
          : undefined,
      };
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}