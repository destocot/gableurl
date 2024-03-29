"use client";
import { GableURL } from "@/lib/types";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";

export const UrlStorage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Button
        borderRadius="0"
        colorScheme="rose"
        size={{ base: "sm", md: "md" }}
        ref={btnRef}
        onClick={onOpen}
        isDisabled
        _disabled={{ opacity: 0.5 }}
      >
        My URLs
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent bg="rose.950">
          <DrawerCloseButton />
          <DrawerHeader>Your recent GableURLs</DrawerHeader>

          <DrawerBody>
            <Card>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
            </Card>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="rose">Clear History</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
