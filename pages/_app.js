import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import '@fontsource/roboto/500.css';
import '@fontsource/archivo-black/400.css';
import "../styles/globals.css";

// const fonts = {
//   fonts: {
//     main: 'Archivo Black, sans-serif',
//     secondary: 'Roboto, sans-serif'
//   },
// };

// const theme = extendTheme({ colors, fonts });

function OtterNot({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default OtterNot;
