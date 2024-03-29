import { VStack, Flex, Button, Icon, Text } from "@chakra-ui/react";
import {
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaRegEnvelope,
  FaBullhorn,
} from "react-icons/fa6";

type SocialsProps = {
  gableURL: string;
};

export const Socials = ({ gableURL }: SocialsProps) => {
  return (
    <VStack align="stretch" color="rose.500" px={1} gap={1}>
      <Flex align="center" gap={2}>
        <Button size="sm" bg="none" _hover={{ bg: "none", cursor: "default" }}>
          <Icon as={FaBullhorn} />
        </Button>
        <Text>Share it</Text>
      </Flex>
      <Flex
        align="center"
        gap={2}
        cursor="pointer"
        onClick={() => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${gableURL}`,
            "Share to Facebook",
            "width=600,height=400"
          );
        }}
      >
        <Button colorScheme="rose" _hover={{ bg: "rose" }} size="sm">
          <Icon as={FaFacebookF} />
        </Button>
        Facebook
      </Flex>
      <Flex
        align="center"
        gap={2}
        cursor="pointer"
        onClick={() => {
          window.open(
            `https://www.twitter.com/intent/post?text=${gableURL}`,
            "Share to Twitter",
            "width=600,height=400"
          );
        }}
      >
        <Button colorScheme="rose" size="sm" _hover={{ bg: "rose" }}>
          <Icon as={FaXTwitter} />
        </Button>
        Twitter
      </Flex>
      <Flex
        align="center"
        gap={2}
        cursor="pointer"
        onClick={() => {
          window.open(
            `https://api.whatsapp.com/send?text=${gableURL}`,
            "Share to WhatsApp",
            "width=600,height=400"
          );
        }}
      >
        <Button size="sm" colorScheme="rose" _hover={{ bg: "rose" }}>
          <Icon as={FaWhatsapp} />
        </Button>
        WhatsApp
      </Flex>
      <Flex
        align="center"
        gap={2}
        cursor="pointer"
        onClick={() => {
          window.open(
            `https://www.linkedin.com/shareArticle?mini=true&url=${gableURL}`,
            "Share to LinkedIn",
            "width=600,height=400"
          );
        }}
      >
        <Button size="sm" colorScheme="rose" _hover={{ bg: "rose" }}>
          <Icon as={FaLinkedin} />
        </Button>
        LinkedIn
      </Flex>
      <Flex
        align="center"
        gap={2}
        cursor="pointer"
        onClick={() => {
          window.open(
            `mailto:?subject=Check out this link&body=${gableURL}`,
            "Share to Email",
            "width=600,height=400"
          );
        }}
      >
        <Button size="sm" colorScheme="rose" _hover={{ bg: "rose" }}>
          <Icon as={FaRegEnvelope} />
        </Button>
        Email
      </Flex>
    </VStack>
  );
};
