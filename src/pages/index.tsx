import { Center, Heading, Text, VStack } from "@chakra-ui/react";

import { Link } from "@/components/link";
import { Seo } from "@/components/seo";

const LandingPage = () => {
  return (
    <>
      <Seo title="Meteo App" />
      <Center flexDirection="column" h="full">
        <VStack maxW="3xl" spacing="8">
          <Heading size="3xl">Meteo App</Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} maxW="2xl" color="muted">
            See weather charts
          </Text>
          <Link href={"/dashboard"} variant="solid">
            Get Started
          </Link>
        </VStack>
      </Center>
    </>
  );
};

export default LandingPage;
