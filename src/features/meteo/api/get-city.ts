import { City } from "../types";
import { useQuery } from "@tanstack/react-query";
import { cities } from "@/data/cities";

type GetCityOptions = {
  id: number;
  name?: string;
  country_code?: string;
};
export const getCity = async ({ id }: GetCityOptions): Promise<City | null> => {
  let citiesData = cities;
  if (id) {
    citiesData = citiesData.filter((city) => city.id === id);
    if (citiesData.length === 1) {
      return Promise.resolve(citiesData[0]);
    }
  }
  return Promise.resolve(null);
};

export const useCity = ({ id }: GetCityOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: ["city", id],
    queryFn: () => getCity({ id }),
  });

  return { data, isLoading };
};
