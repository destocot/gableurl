"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { createShortUrl } from "@/actions/create-short-url";
import { useFormState } from "react-dom";
import * as toast from "@/components/toast";
import * as CreateShortURL from "@/components/create-short-url";
import { QRCodeSVG } from "qrcode.react";
import { Megaphone, QrCode, Redo, Share2, WandSparkles } from "lucide-react";
import {
  FaWhatsapp,
  FaXTwitter,
  FaFacebookF,
  FaLinkedin,
  FaRegEnvelope,
} from "react-icons/fa6";

import { CopyIcon, LinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "@/lib/hooks";
import { set } from "mongoose";

export const Form = () => {
  const [state, formAction] = useFormState(createShortUrl, undefined);
  const [showQr, setShowQr] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([qrRef], () => setShowQr(false));
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([shareRef], () => setShowShare(false));

  const ref = useRef<HTMLFormElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${state?.success}`
    );
    toast.success("Copied to clipboard");
  };

  const handleShowShare = () => {
    setShowQr(false);
    setShowShare((prev) => !prev);
  };

  const handleShowQr = () => {
    setShowShare(false);
    setShowQr((prev) => !prev);
  };

  useEffect(() => {
    if (state?.reset && ref.current) {
      ref.current.reset();
    }
  }, [state?.reset]);

  return (
    <Box
      as="form"
      bg="whiteAlpha.200"
      p={4}
      borderRadius="lg"
      action={formAction}
      w={{ base: "98%", sm: "lg" }}
      mt={{ base: 0, md: -32 }}
      ref={ref}
    >
      <FormControl isInvalid={!!state?.error} colorScheme="">
        <FormLabel>
          <LinkIcon mr={2} mt={-1} />
          Shorten a long URL
        </FormLabel>
        <Input
          placeholder="Enter long link here"
          py={6}
          _focusVisible={{ borderColor: "rose.500" }}
          name="url"
        />
        <FormErrorMessage color="warning.500">{state?.error}</FormErrorMessage>
      </FormControl>
      {state?.success ? (
        <>
          <FormControl mt={4}>
            <FormLabel>
              <Icon as={WandSparkles} mr={2} />
              GableURL
            </FormLabel>
            <Input
              py={6}
              _focusVisible={{ borderColor: "rose.500" }}
              value={`${window.location.origin}/${state.success}`}
            />
          </FormControl>
          <HStack mt={4}>
            <Button
              as={Link}
              colorScheme="whiteAlpha"
              href={`/preview/${state.success}`}
              target="_blank"
            >
              <Icon as={Redo} />
            </Button>
            <Box position="relative">
              <Button
                leftIcon={<QrCode />}
                colorScheme="rose"
                type="button"
                onClick={handleShowQr}
              >
                QR
              </Button>
              {showQr && (
                <Box
                  ref={qrRef}
                  bg="rose.500"
                  p={1}
                  rounded="md"
                  position="absolute"
                  top={-150}
                  right="50%"
                  transform="translateX(50%)"
                  sx={{
                    "::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderStyle: "solid",
                      borderWidth: "10px 7px 0",
                      borderColor: "#f43f5e transparent transparent",
                    },
                  }}
                >
                  <QRCodeSVG
                    value={`${window.location.origin}/${state.success}`}
                  />
                </Box>
              )}
            </Box>
            <Box position="relative">
              <Button
                colorScheme="rose"
                type="button"
                onClick={handleShowShare}
                leftIcon={<Share2 />}
              >
                Share
              </Button>
              {showShare && (
                <Box
                  ref={shareRef}
                  bg="white"
                  p={2}
                  rounded="md"
                  position="absolute"
                  top={-265}
                  zIndex={2}
                  right="50%"
                  transform="translateX(50%)"
                  sx={{
                    "::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderStyle: "solid",
                      borderWidth: "10px 7px 0",
                      borderColor: "#f43f5e transparent transparent",
                    },
                  }}
                >
                  <VStack align="stretch" color="rose.500" px={1}>
                    <Flex
                      align="center"
                      gap={2}
                      fontSize="lg"
                      fontWeight="semibold"
                    >
                      <Button
                        size="sm"
                        bg="none"
                        _hover={{ bg: "none", cursor: "default" }}
                      >
                        <Icon as={Megaphone} />
                      </Button>
                      <Text>Share it</Text>
                    </Flex>
                    <Flex
                      align="center"
                      gap={2}
                      fontSize="lg"
                      fontWeight="semibold"
                      cursor="pointer"
                      onClick={() => {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/${state.success}`,
                          "Share to Facebook",
                          "width=600,height=400"
                        );
                      }}
                    >
                      <Button
                        colorScheme="rose"
                        _hover={{ bg: "rose" }}
                        size="sm"
                      >
                        <Icon as={FaFacebookF} />
                      </Button>
                      Facebook
                    </Flex>
                    <Flex
                      align="center"
                      gap={2}
                      fontSize="lg"
                      fontWeight="semibold"
                      cursor="pointer"
                      onClick={() => {
                        window.open(
                          `https://www.twitter.com/intent/post?text=${window.location.origin}/${state.success}`,
                          "Share to Twitter",
                          "width=600,height=400"
                        );
                      }}
                    >
                      <Button
                        colorScheme="rose"
                        size="sm"
                        _hover={{ bg: "rose" }}
                      >
                        <Icon as={FaXTwitter} />
                      </Button>
                      Twitter
                    </Flex>
                    <Flex
                      align="center"
                      gap={2}
                      fontSize="lg"
                      fontWeight="semibold"
                      cursor="pointer"
                      onClick={() => {
                        window.open(
                          `https://api.whatsapp.com/send?text=${window.location.origin}/${state.success}`,
                          "Share to WhatsApp",
                          "width=600,height=400"
                        );
                      }}
                    >
                      <Button
                        size="sm"
                        colorScheme="rose"
                        _hover={{ bg: "rose" }}
                      >
                        <Icon as={FaWhatsapp} />
                      </Button>
                      WhatsApp
                    </Flex>
                    <Flex
                      align="center"
                      gap={2}
                      fontSize="lg"
                      fontWeight="semibold"
                      cursor="pointer"
                      onClick={() => {
                        window.open(
                          `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.origin}/${state.success}`,
                          "Share to LinkedIn",
                          "width=600,height=400"
                        );
                      }}
                    >
                      <Button
                        size="sm"
                        colorScheme="rose"
                        _hover={{ bg: "rose" }}
                      >
                        <Icon as={FaLinkedin} />
                      </Button>
                      LinkedIn
                    </Flex>
                    <Flex
                      align="center"
                      gap={2}
                      fontSize="lg"
                      fontWeight="semibold"
                      cursor="pointer"
                      onClick={() => {
                        window.open(
                          `mailto:?subject=Check out this link&body=${window.location.origin}/${state.success}`,
                          "Share to Email",
                          "width=600,height=400"
                        );
                      }}
                    >
                      <Button
                        size="sm"
                        colorScheme="rose"
                        _hover={{ bg: "rose" }}
                      >
                        <Icon as={FaRegEnvelope} />
                      </Button>
                      Email
                    </Flex>
                  </VStack>
                </Box>
              )}
            </Box>
            <Button
              colorScheme="rose"
              type="button"
              onClick={handleCopy}
              leftIcon={<CopyIcon />}
            >
              Copy
            </Button>
          </HStack>
          <CreateShortURL.ResetButton />
        </>
      ) : (
        <CreateShortURL.SubmitButton />
      )}
    </Box>
  );
};
