import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { buttonAddItemColor } from "../helpers/Colors";
import { NavLink } from "react-router-dom";

export default function AddItemCard({ name, path }) {
  return (
    <Center py={8}>
      <NavLink to={path} style={{ textDecoration: "none" }}>
        <Box
          role={"group"}
          p={10}
          maxW={"250px"}
          height={"250px"}
          w={"full"}
          borderWidth="15px"
          borderRadius="lg"
          borderColor={buttonAddItemColor}
          boxShadow={"2xl"}
          rounded={"3xl"}
          pos={"relative"}
          _hover={{
            transform: "scale(1.1)",
            transition: "all .3s ease",
          }}
        >
          <Center>
            <AddIcon
              rounded={"lg"}
              src=""
              color={buttonAddItemColor}
              padding={3}
              height={100}
              width={100}
              objectFit={"cover"}
            />
          </Center>

          <Stack pt={4} align={"center"}>
            <Text
              color={buttonAddItemColor}
              fontSize={"17px"}
              textTransform={"uppercase"}
            >
              {name}
            </Text>
          </Stack>
        </Box>
      </NavLink>
    </Center>
  );
}
