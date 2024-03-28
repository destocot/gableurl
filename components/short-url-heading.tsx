"use client";

import { Heading } from "@chakra-ui/react";

type ShortUrlHeadingProps = {
  hash: string;
};

export const ShortUrlHeading = ({ hash }: ShortUrlHeadingProps) => {
  return (
    <Heading opacity={0.9}>
      {window.location.origin}/{hash}
    </Heading>
  );
};
