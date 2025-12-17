import apiClient from "@/api/axios";
import { TEAM } from "@/types/team-member";

export const teamService = {
  getTeamMembers: async (): Promise<TEAM[]> => {
    const response = await apiClient.get("/api/team-member/");
    return response.data as TEAM[];
  },
  getTeamMember: async (id: string): Promise<TEAM> => {
    const response = await apiClient.get(`/api/team-member/${id}`);
    return response.data as TEAM;
  },
};
