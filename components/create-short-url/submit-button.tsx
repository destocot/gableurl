"use client";

import { Button } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      w="100%"
      mt={4}
      colorScheme="rose"
      type="submit"
      isDisabled={pending}
      _disabled={{ opacity: 0.5 }}
    >
      Shorten URL
    </Button>
  );
};
