import React, { useEffect, useState } from "react";
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
  Avatar,
  Textarea,
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";

import { Stepper } from "react-form-stepper";
import CreateItemSmallCard from "../components/CreateItemSmallCard";
import ImagesPickerGrid from "../components/ImagesPickerGrid";

import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";
import AvatarInput from "../components/AvatarInput";
import { useNavigate } from "react-router-dom";

export default function AddNewModel() {
  const color1 = "#CEDAE6";
  const color2 = "#F2EBC9";
  const color3 = "#0000FF";
  const color4 = "#00ABE5";
  const color5 = "#697FBF";

  const { register, handleSubmit } = useForm();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { addModel } = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();

  useEffect(() => {
    if (state.models.success === "navigate") {
      state.models.success = "";
      navigate("/");
    }
  }, [state.models.models.length, state.models.success]);

  const [arrayToPass, setArrayToPass] = useState();

  return (
    <Grid templateColumns="repeat(1, 1fr)" gap={0}>
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
                Add New Model
              </Text>
              <Box as="span" color="blue.600" mt={4} fontSize="sm">
                Fill up the form below to create new model
              </Box>

              <form
                style={{ marginTop: "10px" }}
                onSubmit={handleSubmit((data) =>
                  addModel(data, state.auth.token, arrayToPass)
                )}
              >
                <Grid
                  h="200px"
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
                        placeholder="Model Name"
                        size="lg"
                      />
                    </Center>
                  </GridItem>
                  <GridItem colSpan={6}>
                    <Center h="100%">
                      <Textarea
                        {...register("description", { required: true })}
                        maxLength={255}
                        resize="none"
                        marginBottom="30px"
                        placeholder="Model Description"
                        size="lg"
                      />
                    </Center>
                  </GridItem>
                </Grid>
                <ImagesPickerGrid
                  register={register}
                  oldValues={[]}
                  setArrayToPass={setArrayToPass}
                  arrayToPass={arrayToPass}
                />
                <GridItem marginTop={5}>
                  <Text>Select Models :</Text>
                  <input
                    {...register("modelfbx", { required: true })}
                    className="models"
                    multiple={true}
                    required
                    type="file"
                  />
                </GridItem>
                <Center marginTop={3} color="red">
                  {state.models.loading ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  ) : (
                    state.models.error
                  )}
                </Center>
                <Center marginTop={5}>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="sm"
                    mt={4}
                    px={12}
                    py={6}
                  >
                    Create New Model
                  </Button>
                </Center>
              </form>
            </Box>
          </Box>
        </Center>
      </GridItem>
    </Grid>
  );
}
