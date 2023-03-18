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
  Link,
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
import Avatar1 from "img/avatars/avatar1.png";
import Avatar2 from "img/avatars/avatar2.png";
import Avatar3 from "img/avatars/avatar3.png";
import Avatar4 from "img/avatars/avatar4.png";
import Nft1 from "img/nfts/Nft1.png";
import Nft2 from "img/nfts/Nft2.png";
import Nft3 from "img/nfts/Nft3.png";
import Nft5 from "img/nfts/Nft5.png";
import AdminLayout from "layouts/admin";
import initializeFirebaseClient from "lib/initFirebase";
import NextLink from "next/link";
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
                <Flex
                  align="center"
                  me="20px"
                  ms={{ base: "24px", md: "0px" }}
                  mt={{ base: "20px", md: "0px" }}
                >
                  <NextLink href="#art" passHref>
                    <Link
                      color={textColorBrand}
                      fontWeight="500"
                      me={{ base: "34px", md: "44px" }}
                    >
                      Art
                    </Link>
                  </NextLink>
                  <NextLink href="#music" passHref>
                    <Link
                      color={textColorBrand}
                      fontWeight="500"
                      me={{ base: "34px", md: "44px" }}
                    >
                      Music
                    </Link>
                  </NextLink>
                  <NextLink href="#collectibles" passHref>
                    <Link
                      color={textColorBrand}
                      fontWeight="500"
                      me={{ base: "34px", md: "44px" }}
                    >
                      Collectibles
                    </Link>
                  </NextLink>
                  <NextLink href="#sports" passHref>
                    <Link color={textColorBrand} fontWeight="500">
                      Sports
                    </Link>
                  </NextLink>
                </Flex>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                <NFT
                  name="Abstract Colors"
                  author="By Esthera Jackson"
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                  ]}
                  image={Nft1}
                  currentbid="0.91 ETH"
                  download="#"
                />
                <NFT
                  name="ETH AI Brain"
                  author="By Nick Wilson"
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                  ]}
                  image={Nft2}
                  currentbid="0.91 ETH"
                  download="#"
                />
                <NFT
                  name="Mesh Gradients "
                  author="By Will Smith"
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                  ]}
                  image={Nft3}
                  currentbid="0.91 ETH"
                  download="#"
                />
              </SimpleGrid>
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            // gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
          >
            {/* <Card px="0px" mb="20px">
              <TableTopCreators
                tableData={tableDataTopCreators as unknown as TableData[]}
                columnsData={tableColumnsTopCreators}
              />
            </Card> */}
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
              {projectsData?.map((project) => {
                return (
                  <HistoryItem
                    key={project.uid}
                    name={project.name}
                    author="By Mark Benjamin"
                    date={project.goalDate.toDate().toLocaleDateString()}
                    image={Nft5}
                    price="0.91 ETH"
                    winOdds={1.3}
                    loseOdds={4.2}
                    projectId={project.uid}
                  />
                );
              })}
              <HistoryItem
                name="Abstract Colors"
                author="By Esthera Jackson"
                date="58s ago"
                image={Nft1}
                price="0.91 ETH"
                winOdds={1.3}
                loseOdds={4.2}
                projectId={"2"}
              />
              <HistoryItem
                name="ETH AI Brain"
                author="By Nick Wilson"
                date="1m ago"
                image={Nft2}
                price="0.91 ETH"
                winOdds={1.3}
                loseOdds={4.2}
                projectId={"3"}
              />
            </Card>
          </Flex>
        </Grid>
      </Box>
    </AdminLayout>
  );
}
