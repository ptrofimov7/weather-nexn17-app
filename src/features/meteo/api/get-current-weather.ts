//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true
//https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2023-06-21&end_date=2023-06-28&daily=temperature_2m_mean&timezone=auto

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,winddirection_10m_dominant&timezone=auto&forecast_days=1
// + currnent_weather
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1
import { cities } from "@/data/cities";
import { apiForecastClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { WeatherFilter } from "../types";

// type GetCurrentWeatherOptions = {
//    id: number;
//    latitude: string,
//    longitude: string
//    name?: string;
//    country_code?: string,
// };

export const getCurrentWeather = async ({ids, temperature_min, temperature_max}: WeatherFilter): Promise<any> => {

   if (ids === null) {
      return []
   }
   let citiesData = cities
   if (ids && Array.isArray(ids) && ids.length > 0) {
      citiesData = citiesData.filter(city => ids.includes(city.id))
   }

   const cityMap = citiesData.reduce((acc, cur, index) => {
      const key = `${index}`
       return {...acc, [key]: cur}
   }, {}) as Record<any, any>

   let data =  (await Promise.all(citiesData.map(({ latitude, longitude }: { latitude: number, longitude: number }) => {
      return apiForecastClient.get(`/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,winddirection_10m_dominant&timezone=auto&forecast_days=1`)
   }))) as Array<any>

   //console.log({cityMap, data});

   data = data.map(((element, index) => {
      const { temperature_2m_max, temperature_2m_min, winddirection_10m_dominant, latitude, longitude } = element.daily
      const key = `${index}`
      return {
         id: cityMap?.[key]?.id || Date.now(),
         name: cityMap?.[key]?.name || '',
         temperature_max: temperature_2m_max?.[0],
         temperature_min: temperature_2m_min?.[0],
         windDirection_dominant: winddirection_10m_dominant?.[0],
      }

   }))

   if (Number(temperature_min) <= Number(temperature_max)) {
      data = data.filter((weather: any) => {
         return (Number(weather.temperature_min) >= Number(temperature_min) && Number(weather.temperature_max) <= Number(temperature_max))
      })
   }
   console.log({ids, data, temperature_min, temperature_max});


   return data

};



export const useCurrentWeather = ({ids, temperature_min, temperature_max} : WeatherFilter) => {
   const { data, isLoading } = useQuery({
      queryKey: ['current_weather', ids, temperature_min, temperature_max],
      queryFn: () => getCurrentWeather({ids, temperature_min, temperature_max}),
   });

   return { data, isLoading };
};