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
  
  
  export default function CreateItemSmallCard() {
    return (
      <Center cursor="pointer" py={2}>
          <Box
            role={"group"}
            maxW={"100px"}
            height={"100px"}
            w={"full"}
            borderWidth="5px"
            borderRadius="lg"
            borderColor={buttonAddItemColor}
            boxShadow={"2xl"}
            rounded={"xl"}
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
                height="50px"
                width="50px"
                objectFit={"cover"}
              />
            </Center>
  
            <Stack pt={2} align={"center"}>
              <Text
                color={buttonAddItemColor}
                fontSize={"12px"}
                textTransform={"uppercase"}
              >
                Select Images
              </Text>
            </Stack>
          </Box>
      </Center>
    );
  }
  