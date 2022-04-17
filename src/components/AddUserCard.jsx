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
  
  export default function AddUserCard() {
    return (
      <Center py={12}>
        <Box
          role={"group"}
          p={1}
          maxW={"130px"}
          w={"full"}
          borderWidth="10px"
          borderRadius="lg"
          borderColor={buttonAddItemColor}
          boxShadow={"2xl"}
          rounded={"3xl"}
          pos={"relative"}
          _hover={{
            transform: "scale(1.05)",
            transition: "all .3s ease",
          }}
        >
          <Center>
            <AddIcon
              rounded={"sm"}
              src=""
              color={buttonAddItemColor}
              padding={5}
              marginTop={3}
              height={70}
              width={100}
              objectFit={"cover"}
            />
          </Center>
  
          <Stack marginBottom={5} pt={1} align={"center"}>
            <Text color={buttonAddItemColor} fontSize={"sm"} fontWeight='semibold'>
              Add more users
            </Text>
          </Stack>
        </Box>
      </Center>
    );
  }
  