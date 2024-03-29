import { Button } from "@chakra-ui/react";

export const ResetButton = () => {
  return (
    <>
      <input type="hidden" name="reset" value="true" readOnly />
      <Button colorScheme="rose" mt={4} type="submit" size="lg" w="100%">
        Shorten another
      </Button>
    </>
  );
};
