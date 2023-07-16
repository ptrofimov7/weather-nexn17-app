import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "@/components/link";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Box as="section" h="100vh" overflowY="auto">
      <Navbar />
      <Container
        as="main"
        maxW={{ base: "1200px", xl: "1400px" }}
        py="12"
        h="100%"
        px={{ base: 3, md: 12, xl: 6 }}
      >
        {children}
      </Container>
    </Box>
  );
};

const Navbar = () => {
  return (
    <Box as="nav" bg="primary" color="primaryAccent">
      <Container maxW="container.lg" size="3xl" mt={3} mb={{ base: 0, xl: 3 }}>
        <Flex justify="space-between">
          <HStack>
            <Link variant="solid" href="/">
              Weather App
            </Link>
            <HStack spacing="1">
              <Link
                icon={<InfoOutlineIcon />}
                variant="solid"
                href="/dashboard"
              >
                Weather
              </Link>
            </HStack>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
