import React, { useEffect, useRef, useState } from "react";
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
  Textarea,
  Stack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  RepeatIcon,
  SmallCloseIcon,
  ViewIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./viewModel.css";
import ImagesPickerGrid from "../components/ImagesPickerGrid";
import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";

import ImageCoverInput from "../components/ImageCoverInput";
import axios from "axios";

const ViewModel = () => {
  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [model, setModel] = useState(location.state || null);
  const [loading, setLoading] = useState(model ? false : true);
  const [selectedModel, setSelectedModel] = useState(
    location.state ? location.state.modelfbx[0] : null
  );
  const [subModels, setSubModels] = useState(
    location.state ? location.state.modelfbx : []
  );
  const { id } = useParams();

  const state = useSelector((state) => state);

  const color1 = "#CEDAE6";
  const color2 = "#F2EBC9";
  const color3 = "#0000FF";
  const color4 = "#00ABE5";
  const color5 = "#697FBF";
  var images = [
    "https://placehold.co/90x90",
    "https://placehold.co/90x90",
    "https://placehold.co/90x90",
  ];

  useEffect(() => {
    // console.log(state.auth.token);

    axios
      .get(`/backend/api/v1/objects/${id}`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      .then((response) => {
        setModel(response.data.data.object);
        setSelectedModel(response.data.data.object.modelfbx[0]);
        setSubModels(response.data.data.object.modelfbx)
        setLoading(false);

      })
      .catch((error) => {
        console.log("error load model", error);
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <Box marginTop="60px" px={16} bg={color1}>
      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
        <GridItem w="100%">
          <Stack marginTop="100px" spacing={3}>
            <Text fontSize="4xl" fontWeight="bold">
              {model.name}
            </Text>
            {/* <Profile img={images[0]} company="Archiviz" /> */}
            <Text maxW={400}>{model.description}</Text>
          </Stack>
        </GridItem>
        <GridItem marginBottom="20px" w="100%" bg={color1}>
          <Center h="full">
            <Stack>
              <Box position="relative">
                <Wrap position="absolute" right="6" top="6">
                  <WrapItem>
                    <ChangeButton subModels={subModels} setSubModels={setSubModels} id={model._id} />
                  </WrapItem>
                  <WrapItem>
                    <EditButton model={model} />
                  </WrapItem>
                  <WrapItem>
                    <DeleteButton model={model} />
                  </WrapItem>
                </Wrap>
                <Image
                  src={`/backend/img/models/${model.imageCover}`}
                  w="470px"
                  h="470px"
                />
                <IconButton
                  position="absolute"
                  bottom="6"
                  right="6"
                  size="lg"
                  onClick={onOpen}
                  colorScheme="blue"
                  borderRadius="full"
                  icon={<ViewIcon />}
                />
              </Box>
              <Wrap maxW="600">
                {model.images.map((el) => {
                  return (
                    <WrapItem key={el}>
                      <ImageGallery image={el} />
                    </WrapItem>
                  );
                })}
              </Wrap>
            </Stack>
          </Center>
        </GridItem>
      </Grid>

      <Modal size={"xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center width="full" height="400px" marginBottom={5}>
              <model-viewer
                src={`/backend/file/${selectedModel}`}
                alt="model"
                environment-image="neutral"
                auto-rotate
                camera-controls
              ></model-viewer>
            </Center>

            <Grid templateColumns="repeat(3, 1fr)" width={"65%"}>
              {model.modelfbx.map((el) => {
                return (
                  <Box
                    key={el}
                    bg="white"
                    w="100px"
                    marginBottom={5}
                    borderRadius="xl"
                    border="1px"
                    borderColor="black"
                    overflow="hidden"
                    onClick={() => setSelectedModel(el)}
                  >
                    <Box width="100%" height="100px">
                      <model-viewer
                        src={`/backend/file/${el}`}
                        alt="model"
                        disable-zoom
                        camera-controls
                        environment-image="neutral"
                      ></model-viewer>
                    </Box>
                  </Box>
                );
              })}
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  ) : (
    <div>Loading ...</div>
  );
};

const ChangeButton = ({ subModels,setSubModels,id }) => {


  const { isOpen, onOpen, onClose } = useDisclosure();



  const [modelsToDelete, setModelsToDelete] = useState([]);
  const state = useSelector((state) => state);

  const deleteSubmodelHandler = (name) => {
    setModelsToDelete([...modelsToDelete, name]);

    const newSubModels = subModels.filter((el) => el !== name);
    setSubModels(newSubModels);
  };

  const applyDeleteSubmodelHandler = () => {

    axios
      .delete(`/backend/api/v1/objects/deleteObjectsFromModelList`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
        data: {
          modelsfbx: modelsToDelete,
          id: id,
        },
      })
      .then((response) => {
        console.log("success");
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error.response.data);
      });
  };

  return (
    <>
      <IconButton
        colorScheme="blue"
        borderRadius="full"
        onClick={onOpen}
        icon={<RepeatIcon />}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change models</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Wrap>
              {subModels.map((el) => {
                return (
                  <WrapItem key={el}>
                    <ModelType
                      path={`/backend/file/${el}`}
                      id={el}
                      deleteSubmodelHandler={deleteSubmodelHandler}
                    />
                  </WrapItem>
                );
              })}
            </Wrap>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={applyDeleteSubmodelHandler}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
const EditButton = ({ model }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit } = useForm();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { updateModel } = bindActionCreators(actionCreators, dispatch);
  const [arrayToPass, setArrayToPass] = useState();

  useEffect(() => {
    if (state.models.success === "reload") {
      state.models.success = "";
      window.location.reload();
    }
  }, [state.models.models.length, state.models.success]);

  return (
    <div>
      <IconButton
        colorScheme="green"
        borderRadius="full"
        onClick={onOpen}
        icon={<EditIcon />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={handleSubmit((data) =>
              updateModel(data, state.auth.token, arrayToPass, model._id)
            )}
          >
            <ModalBody>
              <ModalHeader shadow="none" height="80px">
                <Center>Edit model</Center>
              </ModalHeader>
              <ModalCloseButton />

              <Box>
                <Text fontSize="md" fontWeight="semibold">
                  Name :
                </Text>
                <Input
                  {...register("name", { required: false })}
                  placeholder="name"
                  size="lg"
                  mt={4}
                  defaultValue={model.name}
                />
                <Text fontSize="md" fontWeight="semibold" mt={4}>
                  Description :
                </Text>
                <Textarea
                  {...register("description", { required: false })}
                  placeholder="Here is a sample placeholder"
                  defaultValue={model.description}
                  mt={4}
                />
                <Text
                  fontSize="md"
                  mt={4}
                  marginBottom={3}
                  fontWeight="semibold"
                >
                  Image Cover :
                </Text>
                <ImageCoverInput
                  oldImage={model.imageCover}
                  register={register}
                />

                <Text fontSize="md" mt={4} fontWeight="semibold">
                  Images :
                </Text>
                <ImagesPickerGrid
                  oldValues={model.images}
                  register={register}
                  setArrayToPass={setArrayToPass}
                  arrayToPass={arrayToPass}
                />
                <Text
                  fontSize="md"
                  mt={4}
                  fontWeight="semibold"
                  marginBottom={1}
                >
                  Add New Models :
                </Text>
                <input
                  {...register("modelfbx", { required: false })}
                  className="models"
                  multiple={true}
                  type="file"
                />
              </Box>
              <Center marginTop={5} color="red">
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
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" type="submit">
                Apply changes
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};
const DeleteButton = ({ model }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const { deleteModel } = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();

  useEffect(() => {

    if (state.models.success === "navigate") {

      navigate("/");
      state.models.success = "";
    }
  }, [state.models.models.length, state.models.success]);

  return (
    <>
      <IconButton
        colorScheme="red"
        borderRadius="full"
        onClick={onOpen}
        icon={<DeleteIcon />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete model</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this model?</ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              onClick={() => deleteModel(model._id, state.auth.token)}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Profile = ({ img, company }) => {
  return (
    <Wrap>
      <WrapItem>
        <Center>
          <Image src={img} alt="profile" rounded="full" size="sm" />
        </Center>
      </WrapItem>
      <WrapItem>
        <Center h="100%">
          <Text fontSize="xl">{company}</Text>
        </Center>
      </WrapItem>
    </Wrap>
  );
};

const ModelType = ({ path, id, deleteSubmodelHandler }) => {
  return (
    <Box
      bg="white"
      w="150px"
      borderRadius="xl"
      border="1px"
      borderColor="black"
      overflow="hidden"
    >
      <Box width="100%" height="100px">
        <model-viewer
          src={`${path}`}
          alt="model"
          disable-zoom
          camera-controls
          environment-image="neutral"
        ></model-viewer>
      </Box>
      <Center pb="16px">
        <IconButton
          colorScheme="red"
          borderRadius="full"
          icon={<DeleteIcon />}
          onClick={() => {
            deleteSubmodelHandler(id);
          }}
        />
      </Center>
    </Box>
  );
};
const ImageGallery = ({ image }) => {
  return (
    <Box bg="white" borderRadius="3xl" overflow="hidden">
      <Image
        width="100px"
        height="100px"
        src={`/backend/img/models/${image}`}
      />
    </Box>
    // <Box
    //   key={image}
    //   marginTop={2.5}
    //   maxW={"100px"}
    //   height={"100px"}
    //   maxH={"100px"}
    //   w={"full"}
    //   bg="white"
    //   borderRadius="3xl"
    //   overflow="hidden"
    //   position="relative"
    //   _hover={{
    //     transform: "scale(1.1)",
    //     transition: "all .3s ease",
    //   }}
    // >
    //   <Image src={`/backend/img/models/${image}`}  />
    //   <Center>
    //     <IconButton
    //       position="absolute"
    //       top="1"
    //       right="1"
    //       colorScheme="red"
    //       borderRadius="full"
    //       size="xs"
    //       icon={<SmallCloseIcon onClick={() => console.log("delete")} />}
    //     />
    //   </Center>
    // </Box>
  );
};
const ImageToDelete = () => {
  return (
    <Box bg="white" position="relative">
      <Image src="https://placehold.co/100x100" borderRadius="xl" />
      <Center>
        <IconButton
          position="absolute"
          top="1"
          right="1"
          colorScheme="red"
          borderRadius="full"
          size="xs"
          icon={<SmallCloseIcon />}
        />
      </Center>
    </Box>
  );
};

export default ViewModel;
