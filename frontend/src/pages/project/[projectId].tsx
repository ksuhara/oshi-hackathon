/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { doc, getDoc } from "@firebase/firestore";
import { useContract, useContractRead } from "@thirdweb-dev/react";
// Assets
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { Image } from "components/image/Image";
import BetModal from "components/modal/betModal";
import { ethers } from "ethers";
import Usa from "img/dashboards/usa.png";
import AdminLayout from "layouts/admin";
import { PaddockContractAddress } from "lib/constant";
import initializeFirebaseClient from "lib/initFirebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import {
  columnsDataComplex,
  TableData,
} from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import General from "views/admin/profile/components/General";

export default function ProjectDetail() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const router = useRouter();
  const { projectId } = router.query;
  const { db } = initializeFirebaseClient();
  const [projectData, setProjectData] = useState<any>();
  const [betPosition, setBetPosition] = useState(true);

  const { contract } = useContract(PaddockContractAddress);

  const { data: projectOnchainData, isLoading: isLoadingProjectOnchainData } =
    useContractRead(contract, "projects", projectId);

  useEffect(() => {
    if (!projectId) return;
    const projectRef = doc(db, "projects", projectId as string);

    const fetch = async () => {
      getDoc(projectRef).then(async (doc) => {
        setProjectData(doc.data());
      });
    };
    fetch();
  }, [projectId, db]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModalClick = (betPosition: boolean) => {
    setBetPosition(betPosition);
    onOpen();
  };

  const formattedSuccess = Number(
    ethers.utils.formatEther(
      projectOnchainData?.totalBetOnSuccess.toString() || "0"
    )
  );
  const formattedFailure = Number(
    ethers.utils.formatEther(
      projectOnchainData?.totalBetOnFailure.toString() || "0"
    )
  );
  const formattedSponsored = Number(
    ethers.utils.formatEther(projectOnchainData?.sponsored.toString() || "0")
  );
  const totalPod = formattedSuccess + formattedFailure + formattedSponsored;
  const winOdds = (totalPod + 1) / (formattedSuccess + 1);
  const loseOdds = (totalPod + 1) / (formattedFailure + 1);

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>
          <Heading mb="4">{projectData?.name}</Heading>
          <BetModal
            title=""
            isOpen={isOpen}
            onClose={onClose}
            projectId={projectId as string}
            betPosition={betPosition}
            sponsored={formattedSponsored}
            totalBetOnFailure={formattedFailure}
            totalBetOnSuccess={formattedSuccess}
          />
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
            gap="20px"
            mb="20px"
          >
            <General description={projectData?.description} />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
              <DailyTraffic />
              {isLoadingProjectOnchainData ? (
                <></>
              ) : (
                <PieCard
                  sponsored={formattedSponsored}
                  totalBetOnFailure={formattedFailure}
                  totalBetOnSuccess={formattedSuccess}
                />
              )}
            </SimpleGrid>
          </SimpleGrid>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
            gap="20px"
            mb="20px"
          >
            <Button
              colorScheme="red"
              bgColor="red.400"
              color="white"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              px="24px"
              py="5px"
              onClick={() => {
                handleModalClick(false);
              }}
            >
              Place Bid for Failure × {parseFloat(loseOdds.toFixed(2))}
            </Button>
            <Button
              colorScheme="green"
              bgColor="green.400"
              color="white"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              px="24px"
              py="5px"
              onClick={() => {
                handleModalClick(true);
              }}
            >
              Place Bid for Success × {parseFloat(winOdds.toFixed(2))}
            </Button>
          </SimpleGrid>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdAttachMoney}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Pod"
              value={`$${parseFloat(totalPod.toFixed(2))}`}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Earnings"
              value="$350.4"
            />

            <MiniStatistics growth="+23%" name="Sales" value="$574.34" />
            <MiniStatistics
              endContent={
                <Flex me="-16px" mt="10px">
                  <FormLabel htmlFor="balance">
                    <Box boxSize={"12"}>
                      <Image src={Usa} alt="" w={"100%"} h={"100%"} />
                    </Box>
                  </FormLabel>
                  <Select
                    id="balance"
                    variant="mini"
                    mt="5px"
                    me="0px"
                    defaultValue="usd"
                  >
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="gba">GBA</option>
                  </Select>
                </Flex>
              }
              name="Your balance"
              value="$1,000"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                  icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
                />
              }
              name="New Tasks"
              value="154"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdFileCopy}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Projects"
              value="2935"
            />
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            {/* <CheckTable
              columnsData={columnsDataCheck}
              tableData={tableDataCheck as unknown as TableData[]}
            /> */}
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex as unknown as TableData[]}
            />
            <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px">
              <Tasks />
              {/* <MiniCalendar h="100%" minW="100%" selectRange={false} /> */}
            </SimpleGrid>
          </SimpleGrid>
        </>
      </Box>
    </AdminLayout>
  );
}
