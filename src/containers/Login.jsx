import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";

import {
  Grid,
  GridItem,
  Box,
  Image,
  Badge,
  Center,
  Input,
  Button,
  Wrap,
  WrapItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { StarIcon } from "@chakra-ui/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { auth } = bindActionCreators(actionCreators, dispatch);

  const color1 = "#CEDAE6";
  const color2 = "#F2EBC9";
  const color3 = "#0000FF";
  const color4 = "#00ABE5";
  const color5 = "#697FBF";
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
      <GridItem w="100%" h="100vh" bg={color1}>
        <Center h="100vh">
          <Box
            maxW="md"
            minH={350}
            bg="white"
            minW={400}
            borderRadius="3xl"
            overflow="hidden"
          >
            <Box p="6">
              <Text fontSize="x-large" fontWeight="semibold" textAlign="center">
                Welcome to VIBROM
              </Text>
              <Box as="span" color="blue.600" mt={4} fontSize="sm">
                Fill up the form below to get access to your account
              </Box>
              <Input
                placeholder="Email"
                size="lg"
                mt={4}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                size="lg"
                type='password'
                required
                mt={4}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Center>
                <Button
                  onClick={() => auth(email, password)}
                  colorScheme="blue"
                  size="sm"
                  mt={4}
                  px={8}
                  py={4}
                >
                  Login
                </Button>
              </Center>
              <Center marginTop={5} color="red">
                {
                  state.loading ? 
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                /> :
                state.error
              }
              </Center>
              <NavLink to='/register'>
              <Center mt={4}>
                <Wrap>
                  <WrapItem>
                    <Text fontSize="sm">Don't have an account ?</Text>
                  </WrapItem>
                  <WrapItem>
                    <Text fontSize="sm" color={color4}>
                      Create new one
                    </Text>
                  </WrapItem>
                </Wrap>
              </Center>
              </NavLink>
            </Box>
          </Box>
        </Center>
      </GridItem>
      <GridItem w="100%" marginTop={20} bg={color1}>
        <Image src="./login_image.png" alt="Login" />
      </GridItem>
    </Grid>
  );
};

export default Login;
