import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Box,
  Center,
  Input,
  Button,
  Text,
  Spinner,
  Textarea,
  Select,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddNewVisit() {
  const color1 = "#CEDAE6";
  const color2 = "#F2EBC9";
  const color3 = "#0000FF";
  const color4 = "#00ABE5";
  const color5 = "#697FBF";

  const { register, handleSubmit } = useForm();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { addVisit } = bindActionCreators(actionCreators, dispatch);

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    if (state.visits.success === "navigate") {
      state.visits.success = "";
      navigate("/myVisits");
    }

    axios
      .get(`/backend/api/v1/objects/currentUserObjects?fields=name,_id`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      .then((response) => {
        setModels(response.data.data.objects);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setLoading(false);
      });
  }, [state.visits.visits.length, state.visits.success]);

  return loading ? (
    <div> Loading </div>
  ) : (
    <Grid templateColumns="repeat(1, 1fr)" gap={0}>
      <GridItem w="100%" h="100%" bg={color1}>
        <Center h="80vh">
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
                Add New Visit
              </Text>
              <Box as="span" color="blue.600" mt={4} fontSize="sm">
                Fill up the form below to create new visit
              </Box>

              <form
                style={{ marginTop: "10px" }}
                onSubmit={handleSubmit((data) =>
                  addVisit(data, state.auth.token)
                )}
              >
                <Grid
                  h="200px"
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(1,1fr)"
                  gap={5}
                >
                  <Center h="100%">
                    <Input
                      required
                      {...register("name", { required: true })}
                      placeholder="Visit Name"
                      size="lg"
                    />
                  </Center>

                  <Center h="100%">
                    <Textarea
                      {...register("description", { required: true })}
                      maxLength={255}
                      resize="none"
                      placeholder="Visit Description"
                      required
                      size="lg"
                    />
                  </Center>

                  <Select
                    required
                    {...register("modelfbx", { required: true })}
                    placeholder="Select Model"
                  >
                    {models.map((model) => (
                      <option key={model._id} value={model._id}>
                        {model.name}
                      </option>
                    ))}
                  </Select>
                </Grid>

                <Center marginTop={3} color="red">
                  {state.visits.loading ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  ) : (
                    state.visits.error
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
                    Create New Visit
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
