import {
  AddIcon,
  ArrowForwardIcon,
  DeleteIcon,
  EditIcon,
  Icon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  Center,
  Text,
  Grid,
  GridItem,
  Image,
  useMediaQuery,
  Box,
  Input,
  Button,
  Avatar,
  Wrap,
  WrapItem,
  useDisclosure,
  Divider,
  IconButton,
  Textarea,
  Select,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { MdSend } from "react-icons/md";
import "./VisitDetail.css";
import Message from "../components/Message";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import InviteCard from "../components/InviteCard";

import AddUserCard from "../components/AddUserCard";
import MessageDivider from "../components/MessageDivider";
import axios from "axios";
import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";

export default function VisitDetail() {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan990] = useMediaQuery("(min-width: 990px)");
  const [isLargerThan890] = useMediaQuery("(min-width: 890px)");
  const [isLargerThan760] = useMediaQuery("(min-width: 760px)");
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  const [visit, setVisit] = useState();
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState();
  const [loadingUsers, setLoadingUsers] = useState(true);

  const { id } = useParams();

  const state = useSelector((state) => state);

  const inviteUsers = (users, visitId) => {
    const data = {
      visit: visitId,
      users: users,
    };

    axios
      .patch(`/backend/api/v1/visits/addUsersToVisit`, data, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      .then((response) => {
        setVisit(response.data.data.visit);
      })
      .catch((error) => {
        console.log("add users to visit error", error.response.data.message);
      });
  };

  useEffect(() => {
    axios
      .get(`/backend/api/v1/visits/${id}`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      .then((response) => {
        setVisit(response.data.data.visit);
        setComments(response.data.data.visit.comments);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error visit model", error);
        setLoading(false);
      });

    axios
      .get(`/backend/api/v1/users`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      .then((response) => {
        setUsers(response.data.data.users);
        setLoadingUsers(false);
      })
      .catch((error) => {
        console.log("error load model", error);
        setLoadingUsers(false);
      });
  }, []);

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div
      style={{
        marginTop: "60px",
        marginLeft: isLargerThan760 ? "100px" : "20px",
        marginRight: "0px",
      }}
    >
      <Grid
        templateColumns={`repeat(${isLargerThan1280 ? 2 : 1}, 1fr)`}
        gap={1}
      >
        <GridItem colSpan={isLargerThan1280 ? 2 : 1}>
          <Center>
            <Text
              fontSize="2xl"
              fontWeight="semibold"
              textTransform={"uppercase"}
            >
              {visit.name}
            </Text>
          </Center>
          <Center>
            <Text>{visit.userOwner.name}</Text>
          </Center>
        </GridItem>

        <GridItem marginTop="60px">
          <Text fontSize="2xl">Members</Text>
          <Grid
            templateColumns={`repeat(${
              isLargerThan1280
                ? 4
                : isLargerThan990
                ? 6
                : isLargerThan890
                ? 5
                : isLargerThan760
                ? 4
                : isLargerThan500
                ? 3
                : 2
            }, 1fr)`}
            gap={4}
          >
            {!state.auth.userId.localeCompare(visit.userOwner._id) ? (
              <GridItem
                onClick={() => {
                  setOverlay(<OverlayOne />);
                  onOpen();
                }}
                w="100%"
              >
                <AddUserCard />
              </GridItem>
            ) : null}
            {visit.users.map((user) => (
              <GridItem w="100%" key={user._id}>
                <UserCard user={user} />
              </GridItem>
            ))}
          </Grid>
        </GridItem>
        <GridItem>
          <Center height={"full"} width={"full"}>
            <Grid>
              <Box position="relative">
                <Wrap position="absolute" right="6" top="6">
                  <WrapItem>
                    <EditButton visit={visit} />
                  </WrapItem>
                  <WrapItem>
                    <DeleteButton visit={visit} />
                  </WrapItem>
                </Wrap>
                <Image
                  marginTop={10}
                  rounded={"lg"}
                  objectFit={"cover"}
                  src={`/backend/img/models/${visit.modelfbx.imageCover}`}
                />
              </Box>

              <Center>
                <NavLink to='./visit'>
                <Button
                  marginBottom="40px"
                  width="150px"
                  height="50px"
                  backgroundColor="#9BACD2"
                  _hover={{
                    backgroundColor: "#fff",
                    color: "#9BACD2",
                    transform: "scale(1.1)",
                    transition: "all .3s ease",
                  }}
                  color="#fff"
                  borderRadius="20px"
                >
                  Start Visit
                </Button>
                </NavLink>
              </Center>
            </Grid>
          </Center>
        </GridItem>
        <Text fontSize="2xl">Comments</Text>
      </Grid>
      <Box
        borderRadius={"3xl"}
        backgroundColor={"white"}
        width="85vw"
        marginRight="100px"
        height={"700px"}
        marginBottom="30px"
      >
        <Center height="87%" width="100%">
          <Box
            className="myscroll"
            height="93%"
            width="96%"
            marginX="auto"
            borderRadius={"3xl"}
            overflow="scroll"
            overflowX="hidden"
            backgroundColor="blackAlpha.300"
          >
            {comments.map((comment) => (
              <div key={comment._id}>
                <Message
                  content={comment.description}
                  user={comment.user}
                  image={comment.image}
                />
                <MessageDivider />
              </div>
            ))}
          </Box>
        </Center>

        <Center>
          <Input
            backgroundColor="#697FBF"
            opacity="0.4"
            placeholder="Type your comment..."
            _placeholder={{ color: "black" }}
            color="black"
            borderRadius={"3xl"}
            height="70px"
            width="82%"
            marginRight="2%"
          ></Input>
          <Button
            rightIcon={<Icon as={MdSend} />}
            backgroundColor="#CEDAE6"
            borderRadius={"3xl"}
            height="70px"
            width="130px"
            variant="outline"
          >
            Send
          </Button>
        </Center>
      </Box>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent borderRadius="20px" height="600px">
          <ModalHeader>
            <Center>Add more users</Center>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody
            className="myscroll"
            height="600px"
            overflow="scroll"
            overflowX="hidden"
            borderRadius="20px"
            backgroundColor="white"
          >
            {loadingUsers ? (
              <div>Loading ...</div>
            ) : (
              users.map((user) => (
                <div key={user._id}>
                  <InviteCard
                    user={user}
                    inviteUsers={inviteUsers}
                    visitId={visit._id}
                  />
                </div>
              ))
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

const DeleteButton = ({ visit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const { deleteVisit } = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();

  useEffect(() => {
    if (state.visits.success === "navigate") {
      navigate("/myVisits");
      state.visits.success = "";
    }
  }, [state.visits.visits.length, state.visits.success]);

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
          <ModalBody>Are you sure you want to delete this visit?</ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              onClick={() => deleteVisit(visit._id, state.auth.token)}
            >
              Yes
            </Button>
          </ModalFooter>
          <Center marginTop={5} color="red">
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
        </ModalContent>
      </Modal>
    </>
  );
};

const EditButton = ({ visit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit } = useForm();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { updateVisit } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (state.visits.success === "reload") {
      state.visits.success = "";
      window.location.reload();
    }
  }, [state.visits.visits.length, state.visits.success]);

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
              updateVisit(data, state.auth.token, visit._id)
            )}
          >
            <ModalBody>
              <ModalHeader shadow="none" height="80px">
                <Center>Edit visit</Center>
              </ModalHeader>
              <ModalCloseButton />

              <Box>
                <Grid
                  h="200px"
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(1,1fr)"
                  gap={5}
                >
                  <Center h="100%">
                    <Input
                      required
                      {...register("name", { required: false })}
                      placeholder="Visit Name"
                      size="lg"
                      defaultValue={visit.name}
                    />
                  </Center>

                  <Center h="100%">
                    <Textarea
                      {...register("description", { required: false })}
                      maxLength={255}
                      resize="none"
                      placeholder="Visit Description"
                      size="lg"
                      defaultValue={visit.description}
                    />
                  </Center>
                </Grid>
              </Box>

              <Center marginTop={5} color="red">
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
