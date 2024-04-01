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

// const TEST = "https://gableurl.vercel.app/preview/scrary1";

export const Socials = ({ gableURL }: SocialsProps) => {
  const FacebookURL = `https://www.facebook.com/sharer/sharer.php?u=${gableURL}&title=Share GableURL on Facebook&description=&quote=&hashtag=
  `;

  const TwitterURL = `https://twitter.com/intent/post?text=Share GableURL on Twitter&url=${gableURL}
  `;

  const WhatsappURL = `https://api.whatsapp.com/send?text=Share GableURL on WhatsApp%0D%0A${gableURL}%0D%0A`;

  const LinkedinURL = `https://www.linkedin.com/sharing/share-offsite/?url=${gableURL}`;

  const EmailURL = `mailto:?subject=Share GableURL on Email&body=${gableURL}`;

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
          window.open(FacebookURL, "Share to Facebook", "width=600,height=400");
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
          window.open(TwitterURL, "Share to Twitter", "width=600,height=400");
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
          window.open(WhatsappURL, "Share to WhatsApp", "width=600,height=400");
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
          window.open(LinkedinURL, "Share to LinkedIn", "width=600,height=400");
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
          window.open(EmailURL, "Share to Email", "width=600,height=400");
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
