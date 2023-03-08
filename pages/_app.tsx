import "@/styles/globals.css";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <HMSRoomProvider>
        <Component {...pageProps} />
      </HMSRoomProvider>
    </ChakraProvider>
  );
}
