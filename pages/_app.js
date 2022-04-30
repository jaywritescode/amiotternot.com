import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import '@fontsource/roboto/500.css';
import '@fontsource/archivo-black/400.css';
import "../styles/globals.css";

function OtterNot({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default OtterNot;
