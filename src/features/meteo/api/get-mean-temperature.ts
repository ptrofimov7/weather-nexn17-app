import { roundValue } from './../../../utils/format';
//https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2023-06-21&end_date=2023-06-28&daily=temperature_2m_mean&timezone=auto
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&past_days=7&forecast_days=1&timezone=auto
import { apiForecastClient } from "@/lib/api-client";
import { cities } from "@/data/cities";
import { useQuery } from "@tanstack/react-query";

type HistoricalMeanTempareture = {
   time: string;
   temperature_mean: number;
}

export const getHistoricalMeanTemperature = async (ids?: Array<number>): Promise<HistoricalMeanTempareture[]> => {
   let citiesData = cities

   if (ids && Array.isArray(ids) && ids.length > 0) {
      citiesData = citiesData.filter(city => ids.includes(city.id))
   }

   let data = (await Promise.all(citiesData.map(({ latitude, longitude }: { latitude: number, longitude: number }) => {
      return apiForecastClient.get(`/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&past_days=7&forecast_days=0&timezone=auto`) as Promise<any>
   }))) as Record<string, any>[]


   const times = data?.[0]?.daily?.time as string[]
   let temp = {} as Record<string, Array<number | null>>

   data.forEach((element) => {
      const { temperature_2m_min, temperature_2m_max } = element.daily
      let temperature_mean = [] as (number | null)[]
      times.forEach((_: unknown, index: number) => {
         const temperature = roundValue((temperature_2m_min[index] + temperature_2m_max[index]) / 2)
         temperature_mean.push(temperature)
      })

      temperature_mean.forEach((element: number | null, index: number) => {
         if (!temp[times[index]]) {
            temp[times[index]] = []
         }
         temp[times[index]].push(element)
      });
   })

   const result = Object.entries(temp).map(element => {
      const [time, temperature_mean_values] = element

      const temperature_mean = roundValue(temperature_mean_values.reduce((acc: number, cur: number | null) => {
         return acc + (cur ?? 0)
      }, 0) / (temperature_mean_values.length || 1))
      return {
         time,
         temperature_mean
      }
   })

   return result
};

export const useHistoricalMeanTemperature = (ids?: Array<number> | number) => {
   const { data, isFetching, isFetched } = useQuery({
      queryKey: ['weather_last_week', ids],
      queryFn: () => getHistoricalMeanTemperature(typeof (ids) === 'number' ? [ids] : ids),
      initialData: [],
   });

   return {
      data,
      isLoading: isFetching && !isFetched,
   };
};