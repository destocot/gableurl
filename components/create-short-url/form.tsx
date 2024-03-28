"use client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { createShortUrl } from "@/actions/create-short-url";
import { useFormState } from "react-dom";
import * as toast from "@/components/toast";
import * as CreateShortURL from "@/components/create-short-url";

import {
  CopyIcon,
  ExternalLinkIcon,
  LinkIcon,
  StarIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
import { useEffect, useRef } from "react";

export const Form = () => {
  const [state, formAction] = useFormState(createShortUrl, undefined);
  const ref = useRef<HTMLFormElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${state?.success}`
    );
    toast.success("Copied to clipboard");
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
      mt={-32}
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
              <StarIcon mr={2} mt={-1} />
              ShortyURL
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
              <ExternalLinkIcon />
            </Button>
            <Button
              colorScheme="green"
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
