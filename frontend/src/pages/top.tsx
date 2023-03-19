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

// Chakra imports
import {
  Box,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import NFT from "components/card/NFT";
import Banner from "views/admin/marketplace/components/Banner";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";

// Assets
import { collection, getDocs, query, where } from "@firebase/firestore";
import Nft1 from "img/nfts/Nft1.png";
import Nft2 from "img/nfts/Nft2.png";
import Nft3 from "img/nfts/Nft3.png";
import Nft5 from "img/nfts/Nft5.png";
import AdminLayout from "layouts/admin";
import initializeFirebaseClient from "lib/initFirebase";
import { useEffect, useState } from "react";

export default function NftMarketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  const [projectsData, setProjectsData] = useState<any[]>();
  const { db } = initializeFirebaseClient();

  useEffect(() => {
    const projectsQuery = query(
      collection(db, "projects"),
      where("goalDate", ">=", new Date())
    );
    const fetch = async () => {
      let extractData: any = [];
      const querySnapshot = await getDocs(projectsQuery);
      querySnapshot.forEach((doc) => {
        extractData.push({ ...doc.data(), uid: doc.id });
      });
      setProjectsData(extractData);
    };
    fetch();
  }, [db]);

  return (
    <AdminLayout>
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        <Grid
          mb="20px"
          // gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
          gap={{ base: "20px", xl: "20px" }}
          display={{ base: "block", xl: "grid" }}
        >
          <Flex
            flexDirection="column"
            // gridArea={{
            //   xl: "1 / 1 / 3 / 3",
            //   "2xl": "1 / 1 / 3 / 3",
            // }}
            width="100%"
          >
            <Banner />
            <Flex direction="column">
              <Flex
                mt="45px"
                mb="20px"
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
                align={{ base: "start", md: "center" }}
              >
                <Text
                  color={textColor}
                  fontSize="2xl"
                  ms="24px"
                  fontWeight="700"
                >
                  Trending Projects
                </Text>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                <NFT
                  name="Abstract Colors"
                  author="By Esthera Jackson"
                  image={Nft1}
                  currentbid="0.91 ETH"
                  download={`project/${1}`}
                />
                <NFT
                  name="ETH AI Brain"
                  author="By Nick Wilson"
                  image={Nft2}
                  currentbid="0.91 ETH"
                  download={`project/${2}`}
                />
                <NFT
                  name="Mesh Gradients "
                  author="By Will Smith"
                  image={Nft3}
                  currentbid="0.91 ETH"
                  download={`project/${3}`}
                />
              </SimpleGrid>
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            // gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
          >
            <Card p="0px">
              <Flex
                align={{ sm: "flex-start", lg: "center" }}
                justify="space-between"
                w="100%"
                px="22px"
                py="18px"
              >
                <Text color={textColor} fontSize="xl" fontWeight="600">
                  On-Going Projects
                </Text>
              </Flex>
              {projectsData?.map((project, index) => {
                return (
                  <HistoryItem
                    key={project.uid}
                    name={project.name}
                    date={project.goalDate.toDate().toLocaleDateString()}
                    image={index % 2 == 1 ? Nft5 : Nft1}
                    projectId={project.uid}
                  />
                );
              })}
            </Card>
          </Flex>
        </Grid>
      </Box>
    </AdminLayout>
  );
}
