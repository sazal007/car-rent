import { useQuery } from "@tanstack/react-query";
import {
  getVehicles,
  getVehicleById,
  getVehicleBySlug,
} from "@/services/vehicles.service";

export const useVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useVehicleById = (id: string) => {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicleById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useVehicleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["vehicle", "slug", slug],
    queryFn: () => getVehicleBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
