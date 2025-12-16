import { teamService } from "@/services/team.service";
import { useQuery } from "@tanstack/react-query";

export const useGetTeam = () => {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: () => teamService.getTeamMembers(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetTeamMember = (id?: string) => {
  return useQuery({
    queryKey: ["team-member", id],
    enabled: Boolean(id),
    queryFn: () => teamService.getTeamMember(id as string),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
