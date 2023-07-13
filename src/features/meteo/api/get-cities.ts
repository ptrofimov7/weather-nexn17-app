import { City, CityTableData } from "../types";
import { cities } from "@/data/cities";
import { useQuery } from "@tanstack/react-query";

export const getCities = async (country_codes?: Array<string>): Promise<City[]> => {
   let citiesData = cities
   if (country_codes && Array.isArray(country_codes) && country_codes.length > 0) {
      citiesData = citiesData.filter(city => country_codes.includes(city.country_code))
   }

   return Promise.resolve(citiesData)
};


export const getCitiesIds = async (countries?: string | number | (string | number)[] | undefined): Promise<number[]> => {
   let citiesData = cities
   if (countries && Array.isArray(countries) && countries.length > 0) {
      citiesData = citiesData.filter(city => countries.includes(city.country))
   }
  return Promise.resolve(citiesData.map((city: City) => city.id))
};

export const useCities = (country_codes?: Array<string>) => {
   const { data, isFetching, isFetched } = useQuery({
      queryKey: ['cities', country_codes],
      queryFn: () => getCities(country_codes),
      initialData: [],
   });

   return {
      data,
      isLoading: isFetching && !isFetched,
   };
};


export const useCitiesIds = (countries?: string | number | (string | number)[] | undefined) => {
   const { data, isFetching, isFetched } = useQuery({
      queryKey: ['cities_id', countries, ],
      queryFn: () => getCitiesIds(countries),
      initialData: [],
   });

   return {
      data,
      isLoading: isFetching && !isFetched,
   };
};