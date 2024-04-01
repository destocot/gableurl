"use client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { createShortUrl } from "@/actions/create-short-url";
import { LinkIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { Summary } from "./summary";
import ReCAPTCHA from "react-google-recaptcha";

export const CreateShortURLForm = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [hash, setHash] = useState("");

  const [token, setToken] = useState<string | null>(null);
  const ref = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // await new Promise((r) => setTimeout(r, 1000));
    const { data, error } = await createShortUrl(input, token);

    if (error) setError(error);
    if (data) setHash(data);

    ref?.current?.reset();
    setLoading(false);
  };

  const reset = () => {
    setInput("");
    setHash("");
  };

  return (
    <Box
      as="form"
      bg="whiteAlpha.200"
      p={4}
      borderRadius="lg"
      onSubmit={handleSubmit}
      w={{ base: "95%", sm: "480px" }}
    >
      <FormControl isInvalid={!!error} colorScheme="">
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
          value={input}
          onChange={(e) => {
            if (!!hash) return;
            setInput(e.target.value);
          }}
        />
        <FormErrorMessage color="warning.500">{error}</FormErrorMessage>
      </FormControl>
      {!!hash ? (
        <Summary hash={hash} reset={reset} />
      ) : (
        <>
          <ReCAPTCHA
            style={{ display: "inline-block", marginTop: "1rem" }}
            theme="dark"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => {
              setToken(token);
            }}
            ref={ref}
          />
          <Button
            w="100%"
            mt={2}
            colorScheme="rose"
            type="submit"
            isDisabled={loading}
            _disabled={{ opacity: 0.5 }}
          >
            Shorten URL
          </Button>
        </>
      )}
    </Box>
  );
};
