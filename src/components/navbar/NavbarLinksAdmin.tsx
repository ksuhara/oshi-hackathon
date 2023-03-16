// Chakra Imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAddress, useAuth, useMetamask } from "@thirdweb-dev/react";
import { signInWithCustomToken, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import Blockies from "react-blockies";

// Custom Components
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
// Assets
import useFirebaseUser from "hooks/useFirebaseUser";
import initializeFirebaseClient from "lib/initFirebase";
import { useEffect } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import routes from "routes";
export default function HeaderLinks(props: { secondary: boolean }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");
  const address = useAddress();
  const thirdwebAuth = useAuth();
  const { auth, db } = initializeFirebaseClient();
  const { user, isLoading: loadingAuth } = useFirebaseUser();
  const signIn = async () => {
    if (!address) return;
    const payload = await thirdwebAuth?.login();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });
    const { token } = await res.json();
    // Sign in with the token.
    const userCredential = await signInWithCustomToken(auth, token);
    // On success, we have access to the user object.
    const user = userCredential.user;

    // If this is a new user, we create a new document in the database.
    const usersRef = doc(db, "users", user.uid!);
    const userDoc = await getDoc(usersRef);

    if (!userDoc.exists()) {
      // User now has permission to update their own document outlined in the Firestore rules.
      setDoc(usersRef, { createdAt: serverTimestamp() }, { merge: true });
    }
  };

  const connectWithMetamask = useMetamask();
  const handleLogin = async () => {
    await connectWithMetamask();
    await signIn();
  };

  useEffect(() => {
    if (user && !address) {
      connectWithMetamask();
    }
  }, [user, address]);

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SidebarResponsive routes={routes} />
      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          me="10px"
          h="18px"
          w="18px"
          ml="2"
          color={navbarIcon}
          as={colorMode === "light" ? IoMdMoon : IoMdSunny}
        />
      </Button>
      {address ? (
        <>
          {user ? (
            <Menu>
              <MenuButton p="0px">
                <Flex
                  bg={ethBg}
                  borderRadius="full"
                  ms="auto"
                  p="6px"
                  align="center"
                  me="6px"
                >
                  <Flex
                    align="center"
                    justify="center"
                    bg={ethBox}
                    h="29px"
                    borderRadius="full"
                    me="7px"
                  >
                    <Box
                      as={Blockies}
                      seed={address.toLowerCase()}
                      borderRadius="full"
                      overflow="hidden"
                      display="inline-block"
                    />{" "}
                  </Flex>
                  <Text
                    w="max-content"
                    color={ethColor}
                    fontSize="sm"
                    fontWeight="700"
                    me="6px"
                  >
                    {address.substring(0, 12) + "..."}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList
                boxShadow={shadow}
                p="0px"
                mt="10px"
                borderRadius="20px"
                bg={menuBg}
                border="none"
              >
                <Flex w="100%" mb="0px">
                  <Text
                    ps="20px"
                    pt="16px"
                    pb="10px"
                    w="100%"
                    borderBottom="1px solid"
                    borderColor={borderColor}
                    fontSize="sm"
                    fontWeight="700"
                    color={textColor}
                  >
                    👋&nbsp; Hey, Adela
                  </Text>
                </Flex>
                <Flex flexDirection="column" p="10px">
                  <MenuItem
                    _hover={{ bg: "none" }}
                    _focus={{ bg: "none" }}
                    borderRadius="8px"
                    px="14px"
                  >
                    <Text fontSize="sm">Profile Settings</Text>
                  </MenuItem>
                  <MenuItem
                    _hover={{ bg: "none" }}
                    _focus={{ bg: "none" }}
                    color="red.400"
                    borderRadius="8px"
                    px="14px"
                    onClick={() => signOut(auth)}
                  >
                    <Text fontSize="sm">Log out</Text>
                  </MenuItem>
                </Flex>
              </MenuList>
            </Menu>
          ) : (
            <Button
              variant="outline"
              borderRadius="3xl"
              onClick={() => handleLogin()}
            >
              Sign in
            </Button>
          )}
        </>
      ) : (
        <Button
          variant="outline"
          borderRadius="3xl"
          onClick={() => handleLogin()}
        >
          Connect Wallet
        </Button>
      )}
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
