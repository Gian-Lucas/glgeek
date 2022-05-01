import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Provider as NextAuthProvider } from "next-auth/client";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NextAuthProvider session={pageProps.session}>
        <Component {...pageProps} />
      </NextAuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
