import { AutoRedirector } from "@/components/auto-redirector";
import dbConnect from "@/lib/dbConnect";
import Url from "@/models/Url";
import { Box, Button, Heading, Progress, Text, VStack } from "@chakra-ui/react";
import { notFound } from "next/navigation";

type PreviewProps = {
  params: { hash: string };
};

const retrieveUrl = async (hash: string) => {
  await dbConnect();
  const url = await Url.findOne({ hash });
  return url;
};

export default async function Preview({ params: { hash } }: PreviewProps) {
  const url = await retrieveUrl(hash);
  if (!url) notFound();

  return (
    <VStack gap={6} mt={16} px={2}>
      <Heading
        opacity={0.9}
        maxW={{ base: "98%", md: "50%" }}
        fontSize={{ base: "lg", md: "3xl" }}
        isTruncated
      >
        {process.env.NEXT_PUBLIC_URL}/{url.hash}
      </Heading>
      <Text>Redirects to:</Text>
      <Heading
        as="a"
        target="_blank"
        href={url.url}
        opacity={0.9}
        _hover={{ opacity: 1 }}
        maxW={{ base: "98%", md: "50%" }}
        fontSize={{ base: "lg", md: "3xl" }}
        isTruncated
      >
        {url.url}
      </Heading>
      <Box>
        <Progress size="xs" isIndeterminate w="100%" colorScheme="rose" />
        <Text>Please wait while you are redirected...</Text>
      </Box>
      <Button
        as="a"
        variant="link"
        href={url.url}
        target="_blank"
        colorScheme="rose.500"
      >
        Click here if you are not automatically redirected.
      </Button>
      <AutoRedirector url={url.url} />
    </VStack>
  );
}
