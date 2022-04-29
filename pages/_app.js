import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import '@fontsource/roboto/500.css';
import '@fontsource/archivo-black/400.css';
import "../styles/globals.css";

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const fonts = {
  fonts: {
    main: 'Archivo Black, sans-serif',
    secondary: 'Roboto, sans-serif'
  },
};

const theme = extendTheme({ colors, fonts });

function OtterNot({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default OtterNot;
