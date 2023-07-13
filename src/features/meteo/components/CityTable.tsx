import { Box } from '@chakra-ui/react';

import {
  DataTable,
  DataTableProps,
} from '@/components/data-table';
import { Link } from '@/components/link';

import { CityTableData } from '../types';
import { City } from '../types';


export type CitysListProps = {
  cities: CityTableData[];
  isLoading?: boolean;
};

const getTableColumns = (
) => {
  const tableColumns: DataTableProps<CityTableData>['columns'] = [
    {
      title: 'City',
      field: 'name',
    },
    {
      title: 'Temperature max',
      field: 'temperature_max',
    },
    {
      title: 'Temperature min',
      field: 'temperature_min',
    },
    {
      title: 'Wind Direction',
      field: 'windDirection_dominant',
    },
  ];

  return tableColumns;
};

export const CityTable = ({
cities,
  isLoading,
}: CitysListProps) => {
  const tableColumns = getTableColumns();

  return (
    <Box>
      <DataTable
        isLoading={isLoading || false}
        data={cities}
        columns={tableColumns}
      />
    </Box>
  );
};
