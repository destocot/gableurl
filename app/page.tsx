import { Form as CreateShortURLForm } from "@/components/create-short-url";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box display="flex" justifyContent="center">
      <CreateShortURLForm />
    </Box>
  );
}
