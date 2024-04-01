import { CreateShortURLForm } from "@/components/form";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box display="flex" justifyContent="center">
      <CreateShortURLForm />
    </Box>
  );
}
