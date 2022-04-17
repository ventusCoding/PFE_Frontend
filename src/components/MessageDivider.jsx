import React from "react";
import { Divider,Center } from "@chakra-ui/react";

export default function MessageDivider() {
  return (
    <Center>
      <Divider
        marginTop={3}
        borderColor={"black"}
        width="95%"
        orientation="horizontal"
      />
    </Center>
  );
}
