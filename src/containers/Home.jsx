import React from "react";
import SubscribeCard from "../components/SubscribeCard";
import { Center, Grid, GridItem } from "@chakra-ui/react";

export default function Home() {
  return (
    <div style={{ marginTop: "60px" }}>
      <Center>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "500",
          fontSize: "1.3em",
        }}
      >
        You need to subscribe to
        <br /> get access to our features
      </h1>
      </Center>
      <Center>

      <SubscribeCard />
      </Center>
    </div>
  );
}
