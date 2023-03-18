// Chakra imports
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaHorse } from "react-icons/fa";
// Custom components
import { Text } from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex alignItems="center" flexDirection="column">
      {/* <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      <Text fontWeight="extrabold" fontSize="3xl" my="32px" pr="8">
        <Icon as={FaHorse} mr="2" pt="1"></Icon>
        Paddock.io
      </Text>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
