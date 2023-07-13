import { Box } from '@chakra-ui/react';

import {
   DataTable,
   DataTableProps,
} from '@/components/data-table';
import { CityTableData } from '../types';
import React, { ReactElement } from 'react';

export type CitysListProps = {
   children: ReactElement
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
   children
}: CitysListProps) => {
   const tableColumns = getTableColumns();
   const element = React.cloneElement(React.Children.only(children), { columns: tableColumns })
   return (
      <Box>
         {element}
      </Box>
   );
};
