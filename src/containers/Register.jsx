import React, { useState } from "react";
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
  Text,
  Spinner,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";


import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";
import { useForm } from "react-hook-form";
import "../components/avatar-input.css";

import { Stepper } from "react-form-stepper";
import AvatarInput from "../components/AvatarInput";
const Register = () => {
  const color1 = "#CEDAE6";
  const color2 = "#F2EBC9";
  const color3 = "#0000FF";
  const color4 = "#00ABE5";
  const color5 = "#697FBF";

  const { register, handleSubmit } = useForm();

  const state = useSelector((state) => state.auth);

 
  const dispatch = useDispatch();
  const { signup } = bindActionCreators(actionCreators, dispatch);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
      <GridItem w="100%" h="100vh" bg={color1}>
        <Center h="100vh">
          <Image src="./register_image.png" alt="Login" />
        </Center>
      </GridItem>
      <GridItem w="100%" h="100vh" bg={color1}>
        <Center h="100vh">
          <Box
            maxW="x-large"
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
                Fill up the form below to create a new account
              </Box>
              <Box>
                <Stepper
                  steps={[
                    { label: "Create you account" },
                    { label: "Subscribe" },
                  ]}
                  connectorStateColors="true"
                  activeStep={0}
                />
              </Box>
              <form onSubmit={handleSubmit(signup)}>
                <Grid
                  h="150px"
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(9,1fr)"
                >
                  <GridItem rowSpan={2} colSpan={3}>
                    <Center h="100%">
                      <AvatarInput register={register} />
                    </Center>
                  </GridItem>
                  <GridItem colSpan={6}>
                    <Center h="100%">
                      <Input
                        {...register("name", { required: true })}
                        placeholder="Username"
                        required
                        size="lg"
                      />
                    </Center>
                  </GridItem>
                  <GridItem colSpan={6}>
                    <Center h="100%">
                      <Input
                        {...register("email", { required: true })}
                        placeholder="Email"
                        required
                        size="lg"
                      />
                    </Center>
                  </GridItem>
                </Grid>
                <Input
                  {...register("password", { required: true })}
                  type='password'
                  placeholder="Password"
                  required
                  size="lg"
                />
                <Input
                  {...register("passwordConfirm", { required: true })}
                  placeholder="Confirm password"
                  size="lg"
                  required
                  mt={4}
                />
                <Center>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="sm"
                    mt={4}
                    px={12}
                    py={6}
                  >
                    Create account
                  </Button>
                </Center>
                <Center marginTop={5} color="red">
                  {state.loading ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  ) : (
                    state.error
                  )}
                </Center>
              </form>
              <NavLink to="/">
                <Center mt={4}>
                  <Wrap>
                    <WrapItem>
                      <Text fontSize="sm">You have an account ?</Text>
                    </WrapItem>
                    <WrapItem>
                      <Text fontSize="sm" color={color4}>
                        Sign-in
                      </Text>
                    </WrapItem>
                  </Wrap>
                </Center>
              </NavLink>
            </Box>
          </Box>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default Register;
