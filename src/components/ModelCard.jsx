import React from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";

import { buttonHoverColor, buttonModelColor } from "../helpers/Colors";

export default function ModelCard(props) {
  const { model, image, path, name } = props;

  return (
    <Center py={8}>
      <Box
        role={"group"}
        p={6}
        maxW={"250px"}
        height={"250px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"3xl"}
        pos={"relative"}
        _hover={{
          transform: "scale(1.1)",
          transition: "all .3s ease",
        }}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"100px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "60%",
            h: "50%",
            pos: "absolute",
            top: 70,
            left: 50,
            backgroundColor: "#707070",
            filter: "blur(100px)",
          }}
        >
          <Center>
            <Image
              marginTop={10}
              rounded={"lg"}
              height={"full"}
              width={130}
              objectFit={"cover"}
              src={image}
            />
          </Center>
        </Box>
        <Stack pt={20} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {name}
          </Text>

          <Stack direction={"row"} align={"center"}>
            <NavLink to={path} state={model} style={{ textDecoration: "none" }}>
              <Button
                marginTop={2}
                size="md"
                height="40px"
                width="120px"
                bg={buttonModelColor}
              >
                View
              </Button>
            </NavLink>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
