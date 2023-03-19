import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
// import {Astar} from "@thirdweb-dev/chains"
import { AppProps } from "next/app";
import React from "react";
import theme from "theme/theme";

import "styles/App.css";
import "styles/Contact.css";
import "styles/Fonts.css";

import Head from "next/head";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "styles/MiniCalendar.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Paddock</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <ThirdwebProvider
        authConfig={{
          domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
        }}
        activeChain={ChainId.Mumbai}
      >
        <React.StrictMode>
          <Component {...pageProps} />
        </React.StrictMode>
      </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default MyApp;
