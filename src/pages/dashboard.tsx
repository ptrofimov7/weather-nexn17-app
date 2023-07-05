import { Heading, HStack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { Seo } from '@/components/seo';
import { DashboardLayout } from '@/layouts/dashboard-layout';


const DashboardJobsPage = () => {
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
     </>
  );
};

DashboardJobsPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardJobsPage;
