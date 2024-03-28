import dbConnect from "@/lib/dbConnect";
import Url from "@/models/Url";
import { Heading, Text, VStack } from "@chakra-ui/react";
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

  console.log(process.env.NEXT_URL);
  return (
    <VStack gap={6} mt={16} px={2}>
      <Heading opacity={0.9}>
        {process.env.NEXT_URL}/{url.hash}
      </Heading>
      <Text>Redirects to:</Text>
      <Heading
        as="a"
        target="_blank"
        href={url.url}
        opacity={0.9}
        _hover={{ opacity: 1 }}
        maxW={{ base: "98%", md: "50%" }}
        isTruncated
      >
        {url.url}
      </Heading>
    </VStack>
  );
}
