import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";


const initialState = {
  visits: [],
  loading: false,
  error: null,
  success: "",
};


const updateVisitStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const updateVisitSuccess = (state, action) => {

  const newVisits = state.visits.map((visit) => {
    if (visit._id === action.visit._id) {
     
      return action.visit;
    }
    return visit;
  });

  return updateObject(state, {
    visits: newVisits,
    loading: false,
    success: 'reload',
  });

};

const updateVisitFail = (state, action) => {
  // console.log(action);
  return updateObject(state, { error: action.error, loading: false });
};

const deleteVisitStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const deleteVisitSuccess = (state, action) => {
  console.log("reducer : ", action);

  const newVisits = state.visits.filter((visit) => visit._id !== action.id);

  console.log("new visits: ", newVisits);

  return updateObject(state, {
    visits: newVisits,
    loading: false,
    success: 'navigate',
  });
};

const deleteVisitFail = (state, action) => {
  // console.log(action);
  return updateObject(state, { error: action.error, loading: false });
};

const addVisitStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const addVisitSuccess = (state, action) => {
  const newVisit = updateObject(action.visit);
  console.log("newVisit", newVisit);
  return updateObject(state, {
    loading: false,
    visits: state.visits.concat(newVisit),
    success: "navigate",
  });
};

const addVisitFail = (state, action) => {
  // console.log(action);
  return updateObject(state, { error: action.error, loading: false });
};

const fetchVisitsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchVisitsSuccess = (state, action) => {
  return updateObject(state, {
    visits: action.visits,
    loading: false,
  });
};

const fetchVisitsFail = (state, action) => {
  console.log(action);
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};
const visitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_VISITS_START:
      return fetchVisitsStart(state, action);
    case actionTypes.FETCH_VISITS_SUCCESS:
      return fetchVisitsSuccess(state, action);
    case actionTypes.FETCH_VISITS_FAIL:
      return fetchVisitsFail(state, action);

    case actionTypes.ADD_VISITS_START:
      return addVisitStart(state, action);
    case actionTypes.ADD_VISITS_SUCCESS:
      return addVisitSuccess(state, action);
    case actionTypes.ADD_VISITS_FAIL:
      return addVisitFail(state, action);

    case actionTypes.DELETE_VISITS_START:
      return deleteVisitStart(state, action);
    case actionTypes.DELETE_VISITS_SUCCESS:
      return deleteVisitSuccess(state, action);
    case actionTypes.DELETE_VISITS_FAIL:
      return deleteVisitFail(state, action);

    case actionTypes.UPDATE_VISITS_START:
      return updateVisitStart(state, action);
    case actionTypes.UPDATE_VISITS_SUCCESS:
      return updateVisitSuccess(state, action);
    case actionTypes.UPDATE_VISITS_FAIL:
      return updateVisitFail(state, action);

    default:
      return state;
  }
};

export default visitsReducer;
