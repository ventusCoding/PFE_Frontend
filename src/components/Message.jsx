import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Icon,
  Grid,
} from "@chakra-ui/react";
import { WrapItem, Wrap, Avatar, Image, Text, Center } from "@chakra-ui/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { AiOutlineZoomIn } from "react-icons/ai";
import { AiOutlineZoomOut } from "react-icons/ai";
import { MdOutlineZoomOutMap } from "react-icons/md";

export default function Message({ content, image, user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Wrap paddingY="8px" paddingX="16px">
        <WrapItem>
          <Avatar name={user.name} src={`/backend/img/users/${user.photo}`} />
          {content ? (
            <Center height="100%">
              <Text marginLeft="20px">{content}</Text>
            </Center>
          ) : null}
        </WrapItem>
      </Wrap>
      {image ? (
        <Image
          onClick={onOpen}
          cursor="pointer"
          marginLeft="70px"
          width="150px"
          src={`/backend/img/comments/${image}`}
          alt="Dan Abramov"
        />
      ) : null}

      <Modal size="2xl" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Center width="full" height="full">
              <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
              >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <Grid>
                    <Center>
                      <TransformComponent>
                        <Image src={`/backend/img/comments/${image}`} />
                      </TransformComponent>
                    </Center>
                    <Center>
                      <div className="tools" style={{ marginTop: "20px" }}>
                        <button
                          style={{
                            marginRight: "10px",
                            height: "30px",
                            width: "30px",
                          }}
                          onClick={() => zoomIn()}
                        >
                          <Icon
                            color="#697FBF"
                            width="full"
                            height="full"
                            as={AiOutlineZoomIn}
                          />
                        </button>
                        <button
                          style={{
                            marginRight: "10px",
                            height: "30px",
                            width: "30px",
                          }}
                          onClick={() => zoomOut()}
                        >
                          <Icon
                            color="#697FBF"
                            width="full"
                            height="full"
                            as={AiOutlineZoomOut}
                          />
                        </button>
                        <button
                          style={{
                            marginRight: "10px",
                            height: "30px",
                            width: "30px",
                          }}
                          onClick={() => resetTransform()}
                        >
                          <Icon
                            color="#697FBF"
                            width="full"
                            height="full"
                            as={MdOutlineZoomOutMap}
                          />
                        </button>
                      </div>
                    </Center>
                  </Grid>
                )}
              </TransformWrapper>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
