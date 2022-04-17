import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Avatar,
  Image,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { buttonAddItemColor } from "../helpers/Colors";

export default function UserCard({user}) {

  return (
    <Center py={12}>
      <Box
        w={"50"}
        h={"150"}
        bg={"white"}
        rounded={"3xl"}
        _hover={{
          transform: "scale(1.05)",
          transition: "all .3s ease",
        }}
      >
        <Center>
          <Avatar
            borderWidth="2px"
            borderRadius="full"
            borderColor={'black'}
            width={70}
            height={70}
            marginX={7}
            marginTop={7}
            name={user.name}
            src={`/backend/img/users/${user.photo}`}
          />
        </Center>

        <Center>
          <Text
            marginBottom={7}
            marginTop={2}
            color={"black"}
            fontSize={"md"}
          >
            {user.name}
          </Text>
        </Center>
      </Box>
    </Center>
  );
}
