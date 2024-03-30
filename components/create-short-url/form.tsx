"use client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
} from "@chakra-ui/react";
import { createShortUrl } from "@/actions/create-short-url";
import { useFormState } from "react-dom";
import * as toast from "@/components/toast";
import * as CreateShortURL from "@/components/create-short-url";
import { QRCodeSVG } from "qrcode.react";
import { FaQrcode, FaShareNodes, FaWandMagicSparkles } from "react-icons/fa6";
import { ImRedo2 } from "react-icons/im";

import { CopyIcon, LinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "@/lib/hooks";
import { Socials } from "./socials";

export const Form = () => {
  const [state, formAction] = useFormState(createShortUrl, undefined);
  const [showQr, setShowQr] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([qrRef], () => setShowQr(false));
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([shareRef], () => setShowShare(false));

  const gableURL = state?.success
    ? `${process.env.NEXT_PUBLIC_URL}/${state.success}`
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(gableURL);
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
    const urlInput = document.getElementById("url") as HTMLInputElement;
    if (state?.reset && urlInput) {
      urlInput.value = "";
    }
  }, [state?.reset]);

  return (
    <Box
      as="form"
      bg="whiteAlpha.200"
      p={4}
      borderRadius="lg"
      action={formAction}
      w={{ base: "95%", sm: "420px" }}
      mt={{ base: 16, md: -16 }}
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
          id="url"
          readOnly={state?.success ? true : false}
        />
        <FormErrorMessage color="warning.500">{state?.error}</FormErrorMessage>
      </FormControl>
      {state?.success ? (
        <>
          <FormControl mt={4}>
            <FormLabel>
              <Icon as={FaWandMagicSparkles} mr={2} />
              GableURL
            </FormLabel>
            <Input
              py={6}
              _focusVisible={{ borderColor: "rose.500" }}
              value={gableURL}
              onChange={() => {}}
            />
          </FormControl>
          <HStack mt={4}>
            <Button
              as={Link}
              colorScheme="whiteAlpha"
              href={`/preview/${state.success}`}
              target="_blank"
            >
              <Icon as={ImRedo2} />
            </Button>
            <Box position="relative">
              <Button
                leftIcon={<FaQrcode />}
                colorScheme="rose"
                type="button"
                onClick={handleShowQr}
              >
                QR
              </Button>
              {showQr && (
                <Box ref={qrRef} className="qr-container tail">
                  <QRCodeSVG value={gableURL} />
                </Box>
              )}
            </Box>
            <Box position="relative">
              <Button
                colorScheme="rose"
                type="button"
                onClick={handleShowShare}
                leftIcon={<FaShareNodes />}
              >
                Share
              </Button>
              {showShare && (
                <Box ref={shareRef} className="socials-container tail">
                  <Socials gableURL={gableURL} />
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
