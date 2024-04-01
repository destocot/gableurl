"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaQrcode, FaShareNodes, FaWandMagicSparkles } from "react-icons/fa6";
import { ImRedo2 } from "react-icons/im";
import * as toast from "@/components/toast";
import { useRef, useState } from "react";
import { useOnClickOutside } from "@/lib/hooks";
import { CopyIcon } from "@chakra-ui/icons";
import { QRCodeSVG } from "qrcode.react";
import { Socials } from "@/components/socials";

type SummaryProps = {
  hash: string;
  reset: () => void;
};

export const Summary = ({ hash, reset }: SummaryProps) => {
  const gableURL = `${process.env.NEXT_PUBLIC_URL}/${hash}`;

  const [showQr, setShowQr] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([qrRef], () => setShowQr(false));

  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([shareRef], () => setShowShare(false));

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

  return (
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
        {/* redirect button */}
        <Button
          as={Link}
          colorScheme="whiteAlpha"
          href={`/preview/${hash}`}
          target="_blank"
        >
          <Icon as={ImRedo2} />
        </Button>
        {/* qr code button */}
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
        {/* share button */}
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
        {/* copy button */}
        <Button
          colorScheme="rose"
          type="button"
          onClick={handleCopy}
          leftIcon={<CopyIcon />}
        >
          Copy
        </Button>
      </HStack>
      <Button
        colorScheme="rose"
        mt={2}
        type="button"
        size="lg"
        w="100%"
        onClick={reset}
      >
        Shorten another
      </Button>
    </>
  );
};
