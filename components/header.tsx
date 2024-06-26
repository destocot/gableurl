import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { UrlStorage } from "./url-storage";

const links = [
  { href: "#", label: "Sign Up" },
  { href: "#", label: "Sign In" },
];

export const Header = () => {
  return (
    <Flex
      justify="space-between"
      p={5}
      align="center"
      flexDir="column"
      my={4}
      gap={2}
    >
      <Text
        as="h2"
        fontWeight="bold"
        textTransform="uppercase"
        fontSize="5xl"
        lineHeight="none"
      >
        <Link href="/">GableURL</Link>
        <Flex flexDir="column" rowGap={1}>
          <Box w="90%" h={1} bg="white" borderRadius="2xl" />
          <Box w="90%" h={1} bg="white" borderRadius="2xl" ml="auto" />
        </Flex>
      </Text>

      {/* <Box as="nav">
        <Flex as="ul">
          <li>
            <UrlStorage />
          </li>
          {links.map(({ href, label }) => (
            <li key={label}>
              <Button
                as={Link}
                href={href}
                borderRadius="0"
                colorScheme="rose"
                isDisabled
                size={{ base: "sm", md: "md" }}
                _disabled={{ opacity: 0.5 }}
              >
                {label}
              </Button>
            </li>
          ))}
        </Flex>
      </Box> */}
    </Flex>
  );
};
