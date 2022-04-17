import React, { useContext, useEffect, useState } from "react";
import ModelCard from "../components/ModelCard";
import { Center, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import AddItemCard from "../components/AddItemCard";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";


export default function Models() {
  const [isLargerThan1180] = useMediaQuery("(min-width: 1180px)");
  const [isLargerThan810] = useMediaQuery("(min-width: 810px)");

  const [models, setModels] = useState([]);

 

  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const { fetchModels } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetchModels(state.auth.token);
    setModels(state.models.models);


  }, [models, state.models.models.length]);

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
            <AddItemCard name="Add New Model" path="/addNewModel" />
          </GridItem>

          {models.length === 0
            ? "no data found"
            : models.map((el) => (
                <GridItem key={el._id} w="100%">
                  <ModelCard
                    model={el}
                    name={el.name}
                    image={`/backend/img/models/${el.imageCover}`}
                    path={`/models/${el._id}`}
                  />
                </GridItem>
              ))}
        </Grid>
      )}
    </div>
  );
}
