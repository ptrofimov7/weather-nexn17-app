import { Heading, HStack } from '@chakra-ui/react';
import { ReactElement, useCallback, useEffect, useState } from 'react';

import { Seo } from '@/components/seo';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { BarChartComponent } from '@/components/bar-chart';
import { useHistoricalMeanTemperature } from '@/features/meteo/api/get-mean-temperature';
import { CityTable } from '@/features/meteo/components/CityTable';
import { useCurrentWeather } from '@/features/meteo/api/get-current-weather';
import { useCitiesIds } from '@/features/meteo/api/get-cities';
import { CityFiltersForm } from '@/features/meteo/components/CityFilters';
import { CityFilters } from '@/features/meteo/types';
import { DataTable } from '@/components/data-table';


const DashboardJobsPage = () => {
   const [filters, setFilters] = useState<CityFilters>({} as CityFilters)
   const [activeRowId, setActiveRowId] = useState<number | undefined>(undefined)
   const cities = useCitiesIds(filters?.country_code)
   const citiesData = cities.isLoading ? undefined : cities.data
   const history = useHistoricalMeanTemperature(activeRowId ? activeRowId : citiesData)
   const weather = useCurrentWeather({ ids: citiesData, ...filters })

   useEffect(() => {

      setActiveRowId(undefined)

   }, [filters])

   const handleChange = (value: CityFilters) => {
      setFilters(value)
   }

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
         <CityTable>
            <DataTable
               isLoading={weather.isLoading || false}
               data={weather.data}
               activeRowId={activeRowId}
               setActiveRowId={setActiveRowId}
            />
         </CityTable>
      </>
   );
};

DashboardJobsPage.getLayout = function getLayout(
   page: ReactElement
) {
   return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardJobsPage;
