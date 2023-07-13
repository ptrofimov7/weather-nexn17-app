import { City } from "../types";
import { cities } from "@/data/cities";
import { useQuery } from "@tanstack/react-query";
import { resourceLimits } from "worker_threads";

export const getCountries = async (country_codes?: Array<string>): Promise<any[]> => {
   let countriesData = new Map()
   let citiesData = cities
   if (country_codes && Array.isArray(country_codes) && country_codes.length > 0) {
      citiesData = citiesData.filter(city => country_codes.includes(city.country_code))
   }
   citiesData.forEach(city => {
      countriesData.set(city.country_code, city.country)
   })

   const result = Array.from(countriesData.keys()).map((key) => {
      return { label: key, value: countriesData.get(key)}
   })

   result.sort((a: any, b: any) => a.value.localeCompare(b.value))
   console.log({result});
   return Promise.resolve(result)
};

export const useCountries = (country_codes?: Array<string>) => {
   const { data, isFetching, isFetched } = useQuery({
      queryKey: ['countries', country_codes],
      queryFn: () => getCountries(country_codes),
      initialData: [],
   });

   return {
      data,
      isLoading: isFetching && !isFetched,
   };
};