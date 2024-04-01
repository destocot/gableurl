import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const success = (message: string) => {
  return toast({
    title: "Success",
    description: message,
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top-right",
  });
};

export const info = (message: string) => {
  return toast({
    title: "Info",
    description: message,
    status: "info",
    duration: 2000,
    isClosable: true,
    position: "top-right",
  });
};
