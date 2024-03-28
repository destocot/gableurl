import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const success = (message: string) => {
  return toast({
    title: "Success",
    description: message,
    status: "success",
    duration: 1000,
    isClosable: true,
    position: "top-right",
  });
};
