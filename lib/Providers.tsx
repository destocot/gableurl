"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    rose: {
      950: "#4c0519",
      900: "#881337",
      800: "#9f1239",
      700: "#be123c",
      600: "#e11d48",
      500: "#f43f5e",
      400: "#fb7185",
      300: "#fda4af",
      200: "#fecdd3",
      100: "#ffe4e6",
      50: "#fff1f2",
    },
    warning: {
      700: "#a16207",
      600: "#ca8a04",
      500: "#eab308",
    },
  },
  styles: {
    global: {
      body: {
        bg: "rose.950",
        color: "white",
        bgImg:
          "url('https://www.transparenttextures.com/patterns/60-lines.png')",
      },
      ".chakra-alert": {
        transform: "scale(0.9)",
      },
      li: {
        listStyleType: "none",
      },
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
