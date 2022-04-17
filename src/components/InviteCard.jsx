import {
  Avatar,
  Text,
  Wrap,
  WrapItem,
  Center,
  Button,
  Spacer,
  Flex,
  Box,
} from "@chakra-ui/react";
import React from "react";

import { inviteButtonColor } from "../helpers/Colors";

export default function InviteCard({ user, inviteUsers, visitId }) {

  return (
    <div>
      <Flex>
        <Box p="4">
          <Wrap p="4" paddingY="8px" paddingX="16px" width={"full"}>
            <WrapItem>
              <Avatar
                name={user.name}
                src={`/backend/img/users/${user.photo}`}
              />
              <Center height="100%">
                <Text marginLeft="20px">{user.name}</Text>
              </Center>
            </WrapItem>
          </Wrap>
        </Box>
        <Spacer />
        <Box p="4">
          <Center height="100%">
            <Button
              p="4"
              width={"15vh"}
              fontSize="13px"
              color="white"
              backgroundColor={inviteButtonColor}
              variant="solid"
              onClick={() => inviteUsers([user._id], visitId)}
            >
              Invite
            </Button>
          </Center>
        </Box>
      </Flex>
    </div>
  );
}
