import { Heading, HStack } from '@chakra-ui/react';
import { ReactElement, useCallback, useState } from 'react';

import { Seo } from '@/components/seo';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { BarChartComponent } from '@/components/bar-chart';
import { useHistoricalMeanTemperature } from '@/features/meteo/api/get-mean-temperature';
import { CityTable } from '@/features/meteo/components/CityTable';
import { useCurrentWeather } from '@/features/meteo/api/get-current-weather';
import { useCitiesIds } from '@/features/meteo/api/get-cities';
import { CityFiltersForm } from '@/features/meteo/components/CityFilters';
import { CityFilters } from '@/features/meteo/types';


const DashboardJobsPage = () => {
   const history = useHistoricalMeanTemperature()
   const [filters, setFilters] = useState<CityFilters>({} as CityFilters)
   const cities = useCitiesIds(filters?.country_code)
   const weather = useCurrentWeather({ids: cities.isLoading ? null : cities.data, ...filters})
   const handleChange = useCallback((val: any) => {
      setFilters(val)
      console.log({val})
   }, [])
   console.log({filters});

   return (
      <>
         <Seo title="Meteo dashboard" />
         <HStack
            mb="8"
            align="center"
            justify="space-between"
         >
            <Heading>Weather</Heading>
         </HStack>
         <BarChartComponent
            data={history.data || []}
            data_key='temperature_mean'
            isLoading={history.isLoading}
         />
         <CityFiltersForm onChange={handleChange} />
         <CityTable cities={weather.data} isLoading={weather.isLoading} />
      </>
   );
};

DashboardJobsPage.getLayout = function getLayout(
   page: ReactElement
) {
   return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardJobsPage;
