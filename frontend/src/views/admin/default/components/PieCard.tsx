// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import PieChart from "components/charts/PieChart";
import { VSeparator } from "components/separator/Separator";
import { pieChartOptions } from "variables/charts";
export default function Conversion(props: {
  totalBetOnSuccess: number;
  totalBetOnFailure: number;
  sponsored: number;
  [x: string]: any;
}) {
  const { totalBetOnSuccess, totalBetOnFailure, sponsored, ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const pieChartData = [totalBetOnSuccess, totalBetOnFailure, sponsored];

  return (
    <Card
      p="20px"
      alignItems="center"
      flexDirection="column"
      w="100%"
      {...rest}
    >
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          Pie Chart
        </Text>
      </Flex>

      <PieChart
        h="100%"
        w="100%"
        chartData={pieChartData}
        chartOptions={pieChartOptions}
      />
      <Card
        bg={cardColor}
        flexDirection="row"
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="20px"
        mt="15px"
        mx="auto"
      >
        <Flex direction="column" py="5px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="brand.500" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              Success
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {Math.floor(
              (totalBetOnSuccess * 100) /
                (totalBetOnSuccess + totalBetOnFailure)
            )}
            %
          </Text>
        </Flex>
        <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#6AD2FF" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              Failure
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {Math.floor(
              (totalBetOnFailure * 100) /
                (totalBetOnSuccess + totalBetOnFailure)
            )}
            %
          </Text>
        </Flex>
      </Card>
    </Card>
  );
}
