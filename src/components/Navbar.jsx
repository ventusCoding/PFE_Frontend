import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, BellIcon } from "@chakra-ui/icons";
import { mainColor, bellColor } from "../helpers/Colors";
import Notification from "./Notification/Notification";
import { FaUserAlt } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";

const normalUserLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Belong Visits",
    path: "/belongVisits",
  },
];

const premiumUserLinks = [
  {
    name: "Models",
    path: "/",
  },
  {
    name: "My Visits",
    path: "/myVisits",
  },
  {
    name: "Belong Visits",
    path: "/belongVisits",
  },
];

const NavigationLink = ({ children, path }) => (
  <NavLink
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={path}
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan1280] = useMediaQuery("(min-width: 550px)");

  const state = useSelector((state) => state.auth);

  return (
    <>
      <Box paddingTop={5} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-around"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={"center"}>
            <Box>
              {isLargerThan1280 ? (
                <Image style={{ width: "150px" }} src={`${import.meta.env.VITE_APPDOMAIN}/logo.png`} alt="Logo" />
              ) : null}
            </Box>
          </HStack>

          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {state.user.role.localeCompare("premium") === 0
                ? premiumUserLinks.map((link) => (
                    <NavigationLink key={link.path} path={link.path}>
                      {link.name}
                    </NavigationLink>
                  ))
                : normalUserLinks.map((link) => (
                    <NavigationLink key={link.path} path={link.path}>
                      {link.name}
                    </NavigationLink>
                  ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Notification />
            <Menu>
              <MenuButton
                as={Button}
                marginLeft={2}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  showBorder={true}
                  borderWidth={3}
                  
                  borderColor={"white"}
                  size={"md"}
                  src={`/backend/img/users/${state.user.photo}`}
                />
              </MenuButton>
              <MenuList
                style={{
                  alignContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Box>{state.user.name}</Box>
                <MenuItem>Profile</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
            {state.user.role.localeCompare("premium") === 0
                ? premiumUserLinks.map((link) => (
                    <NavigationLink key={link.path} path={link.path}>
                      {link.name}
                    </NavigationLink>
                  ))
                : normalUserLinks.map((link) => (
                    <NavigationLink key={link.path} path={link.path}>
                      {link.name}
                    </NavigationLink>
                  ))}
              
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
