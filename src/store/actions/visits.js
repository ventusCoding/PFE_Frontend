import * as actionTypes from "./actionTypes";
import axios from "axios";



export const updateVisitSuccess = (visit) => {
  return {
    type: actionTypes.UPDATE_VISITS_SUCCESS,
    visit,
  };
};

export const updateVisitFail = (error) => {
  return {
    type: actionTypes.UPDATE_VISITS_FAIL_FAIL,
    error,
  };
};
export const updateVisitStart = () => {
  return {
    type: actionTypes.UPDATE_VISITS_START,
  };
};

export const updateVisit = (data, token, id) => {
  return (dispatch) => {
    dispatch(updateVisitStart());


    axios
      .patch(`/backend/api/v1/visits/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.data);
        dispatch(updateVisitSuccess(response.data.data.visit));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(updateVisitFail(error.response.data.message));
      });
  };
};

export const deleteVisitSuccess = (id) => {
  return {
    type: actionTypes.DELETE_VISITS_SUCCESS,
    id,
  };
};

export const deleteVisitFail = (error) => {
  return {
    type: actionTypes.DELETE_VISITS_FAIL,
    error,
  };
};
export const deleteVisitStart = () => {
  return {
    type: actionTypes.DELETE_VISITS_START,
  };
};

export const deleteVisit = (id, token) => {
  return (dispatch) => {
    dispatch(deleteVisitStart());

    axios
      .delete(`/backend/api/v1/visits/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("success");
        dispatch(deleteVisitSuccess(id));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(deleteVisitFail(error.response.data.message));
      });
  };
};

export const addVisitSuccess = (visit) => {
  return {
    type: actionTypes.ADD_VISITS_SUCCESS,
    visit,
  };
};

export const addVisitFail = (error) => {
  return {
    type: actionTypes.ADD_VISITS_FAIL,
    error,
  };
};
export const addVisitStart = () => {
  return {
    type: actionTypes.ADD_VISITS_START,
  };
};

export const addVisit = (data, token) => {
  return (dispatch) => {
    dispatch(addVisitStart());


    axios
      .post(`/backend/api/v1/visits/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(addVisitSuccess(response.data.data.visit));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(addVisitFail(error.response.data.message));
      });
  };
};

export const fetchVisitsSuccess = (visits) => {
  return {
    type: actionTypes.FETCH_VISITS_SUCCESS,
    visits,
  };
};

export const fetchVisitsFail = (error) => {
  return {
    type: actionTypes.FETCH_VISITS_FAIL,
    error,
  };
};
export const fetchVisitsStart = () => {
  return {
    type: actionTypes.FETCH_VISITS_START,
  };
};
export const fetchVisits = (token) => {
  return (dispatch) => {
    dispatch(fetchVisitsStart());
 
    axios
      .get(`/backend/api/v1/visits/currentUserVisits`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(fetchVisitsSuccess(response.data.data.visits));
      })
      .catch((error) => {
        dispatch(fetchVisitsFail(error.response.data.message));
      });
  };
};
