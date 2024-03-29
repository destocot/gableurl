import { Form as CreateShortURLForm } from "@/components/create-short-url";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box
      flexGrow={1}
      display="flex"
      justifyContent="center"
      alignItems={{ base: "flex-start", md: "center" }}
    >
      <CreateShortURLForm />
    </Box>
  );
}
