import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
      },
    },
  },
});
