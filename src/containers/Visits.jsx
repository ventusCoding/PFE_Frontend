import React, { useEffect, useState } from "react";
import ModelCard from "../components/ModelCard";
import { Center, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import AddItemCard from "../components/AddItemCard";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";

export default function Visits() {
  const [isLargerThan1180] = useMediaQuery("(min-width: 1180px)");
  const [isLargerThan810] = useMediaQuery("(min-width: 810px)");

  const [visits, setVisits] = useState([]);

  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const { fetchVisits } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetchVisits(state.auth.token);
    setVisits(state.visits.visits);

  }, [visits, state.visits.visits.length]);

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
          <GridItem w="100%">
            <AddItemCard name="Add New Visit" path="/addNewVisit" />
          </GridItem>

          {visits.map((el) => (
            <GridItem key={el._id} w="100%">
              <ModelCard
                name={el.name}
                model={el}
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
