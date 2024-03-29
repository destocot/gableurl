import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

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
      mb={5}
    >
      <Heading
        as="h2"
        size={{ base: "lg", md: "2xl" }}
        textTransform="uppercase"
      >
        <Link href="/">GableURL</Link>
      </Heading>

      <Box as="nav">
        <Flex as="ul">
          {links.map(({ href, label }) => (
            <li key={href}>
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
