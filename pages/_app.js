import { ChakraProvider } from "@chakra-ui/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import theme from "../theme";
import "@fontsource/roboto/500.css";
import "@fontsource/archivo-black/400.css";
import "../styles/globals.css";

config.autoAddCss = false;

function OtterNot({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default OtterNot;
