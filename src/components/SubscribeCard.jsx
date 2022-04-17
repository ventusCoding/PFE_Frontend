import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import {
  cardGreyBackgroundColor,
  buttonBlueColor,
  buttonHoverColor,
} from "../helpers/Colors";

export default function SubscribeCard() {
  return (
    <Center py={6}>
      <Box
      marginTop={10}
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"3xl"}
        overflow={"hidden"}
      >
        <Stack
          paddingY={5}
          textAlign={"center"}
          bg={cardGreyBackgroundColor}
          align={"center"}
        >
          <Text fontSize={"lg"} fontWeight={600} p={2} px={3} rounded={"full"}>
            Premium offer
          </Text>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text color={"gray.500"}>150 DT TTC</Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.400" />
              Create virtual visits
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.400" />
              Upload Models
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.400" />
              Invite People to your virtual visit
            </ListItem>
          </List>

          <Center>
            <Button
              mt={10}
              w={"52"}
              bg={buttonBlueColor}
              color={"white"}
              rounded={"xl"}
              boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
              _hover={{
                bg: buttonHoverColor,
              }}
            >
              Start your trial
            </Button>
          </Center>
        </Box>
      </Box>
    </Center>
  );
}
