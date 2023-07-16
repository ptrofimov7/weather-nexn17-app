import {
  Box,
  Center,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from '@chakra-ui/react';

import { Entity } from '@/types';

import { Loading } from '../loading';
import { Dispatch, SetStateAction } from 'react';

type DataTableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  render?: ({ entry }: { entry: Entry }) => JSX.Element;
};

export type DataTableProps<Entry> = {
  isLoading: boolean;
  data?: Entry[];
  columns?: DataTableColumn<Entry>[];
  activeRowId: number | undefined,
  setActiveRowId: Dispatch<SetStateAction<number | undefined>>
};

export const DataTable = <Entry extends Entity>({
  data,
  columns,
  isLoading,
  activeRowId,
  setActiveRowId
}: DataTableProps<Entry>) => {

  if (isLoading) {
    return <Loading />;
  }

  if (data?.length === 0 || (!columns || columns.length === 0)) {
    return (
      <Center
        h="56"
        p="4"
        bg="gray.100"
        borderRadius="md"
      >
        No Data
      </Center>
    );
  }

  return (
    <Box
      h="full"
      rounded="md"
      borderWidth="1px"
      bg="whiteAlpha.400"
    >
      <Box style={{display: 'flex', alignItems:'stretch', overflowY: "auto" }} h='100%'>
        <Table  w="full" color="white" background='dark' h='100%'>
          <Thead>
            <Tr style={{ position: 'sticky', top: '0', background: 'black', color: "white" }}>
              {columns.map((column, index) => (
                <Th key={column.title + index} style={{ color: 'white', background: 'dark'}}>
                  {column.title}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((entry, entryIndex) => (
              <Tr
                data-testid={`table-row-${entry.id}`}
                key={entry.id}
                onClick = {(e) => {
                  setActiveRowId(entry.id)
                }}
                background={(activeRowId && activeRowId == entry.id) ? 'blue.900' : (entryIndex % 2 === 0 ? 'blackAlpha.800': 'blackAlpha.700')}
              >
                {columns.map(
                  (
                    { field, title, render },
                    columnIndex
                  ) => (
                    <Td key={title + columnIndex}>
                      <Text textAlign={columnIndex === 0 ? 'left': 'right'}>
                        {render
                          ? render({ entry })
                          : `${entry[field]}`}
                      </Text>
                    </Td>
                  )
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
