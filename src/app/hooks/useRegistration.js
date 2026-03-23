// hooks/useGetCityName.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

export const useGetCityName = (cityName) => {
  return useQuery({
    queryKey: ["getCityName", cityName],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/city-iata/search/${cityName}`
      );

      // adjust based on your API response
      return res?.data || [];
    },
    enabled: !!cityName && cityName.length >= 3,
    staleTime: 1000 * 60, // cache 1 min
    refetchOnWindowFocus: false,
  });
};