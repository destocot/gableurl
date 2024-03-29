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
      px={{ base: 2, md: 10 }}
      py={5}
      align="center"
      mb={16}
      flexDir={{ base: "column", sm: "row" }}
    >
      <Text as="h2" fontWeight="bold" textTransform="uppercase" fontSize="4xl">
        <Link href="/">GableURL</Link>
      </Text>

      <Box as="nav">
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
      </Box>
    </Flex>
  );
};
