import React, { useEffect, useState } from "react";
import ModelCard from "../components/ModelCard";
import { Center, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import AddItemCard from "../components/AddItemCard";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Visits() {
  const [isLargerThan1180] = useMediaQuery("(min-width: 1180px)");
  const [isLargerThan810] = useMediaQuery("(min-width: 810px)");

  const [visits, setVisits] = useState([]);

  const state = useSelector((state) => state);

  useEffect(() => {
    axios
      .get(`/backend/api/v1/visits/belongVisits`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      })
      .then((response) => {
        setVisits(response.data.data.visits);
      })
      .catch((error) => {
        console.error("custome error : ", error);
      });
  }, [visits.length]);

  return (
    <div style={{ marginTop: "60px" }}>
      {state.models.loading ? (
        <div> Loading ... </div>
      ) : (
        <Grid
          templateColumns={`repeat(${
            isLargerThan1180 ? "3" : isLargerThan810 ? "2" : "1"
          }, 1fr)`}
        >

          {visits.map((el) => (
            <GridItem key={el._id} w="100%">
              <ModelCard
                name={el.name}
                image={`/backend/img/models/${el.modelfbx.imageCover}`}
                path={`/visits/${el._id}`}
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </div>
  );
}
