// Chakra imports
import { Flex, Text } from "@chakra-ui/react";
import styles from "styles/Banner.module.css";

// Assets
// import banner from 'img/nfts/NftBanner1.png'

export default function Banner() {
  // Chakra Color Mode
  return (
    <Flex
      className={styles.bgImage}
      direction="column"
      // bgImage={banner}
      bgSize="cover"
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius="30px"
    >
      <Text
        fontSize={{ base: "24px", md: "30px" }}
        color="white"
        mb="14px"
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        fontWeight="700"
        lineHeight={{ base: "32px", md: "42px" }}
      >
        The ultimate project forecasting marketplace.
      </Text>
      <Text
        fontSize="md"
        color="#E3DAFF"
        maxW={{
          base: "100%",
          md: "64%",
          lg: "40%",
          xl: "56%",
          "2xl": "46%",
          "3xl": "34%",
        }}
        fontWeight="500"
        mb="20px"
        lineHeight="28px"
      >
        Unlock the power of prediction! Bet on your project&apos;s future.
        Discover success and navigate challenges with Paddock.io
      </Text>
    </Flex>
  );
}
