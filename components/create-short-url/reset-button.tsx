import { Button } from "@chakra-ui/react";

export const ResetButton = () => {
  return (
    <>
      <input type="hidden" name="reset" value="true" />
      <Button colorScheme="green" mt={4} type="submit" size="lg" w="100%">
        Shorten another
      </Button>
    </>
  );
};
