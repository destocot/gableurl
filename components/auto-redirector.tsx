"use client";

import { useEffect } from "react";

type AutoRedirectorProps = {
  url: string;
};

export const AutoRedirector = ({ url }: AutoRedirectorProps) => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = url;
    }, 5000);
  }, [url]);

  return <></>;
};
