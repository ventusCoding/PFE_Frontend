import * as actionTypes from "./actionTypes";
import axios from "axios";


export const updateModelSuccess = (model) => {
  return {
    type: actionTypes.UPDATE_MODELS_SUCCESS,
    model,
  };
};

export const updateModelFail = (error) => {
  return {
    type: actionTypes.UPDATE_MODELS_FAIL,
    error,
  };
};
export const updateModelStart = () => {
  return {
    type: actionTypes.UPDATE_MODELS_START,
  };
};

export const updateModel = (data, token, arrayToPass, id) => {
  return (dispatch) => {
    dispatch(updateModelStart());

    let newImages = [];


    for (let i = 0; i < data.images.length; i++) {
      if (arrayToPass.indexOf(data.images[i].name) !== -1) {

        newImages.push(data.images[i]);
      }
    }


    const formData = new FormData();

    formData.append("arrayToPass", arrayToPass);

    if (data.name.length > 0) {
      formData.append("name", data.name);
    }
    if (data.description.length > 0) {
      formData.append("description", data.description);
    }
    if (newImages.length > 0) {
      for (let i = 0; i < newImages.length; i++) {
        formData.append("images", newImages[i]);
      }
    }
    if (data.imageCover.length > 0) {
      formData.append("imageCover", data.imageCover[0]);
    }
    if (data.modelfbx.length > 0) {
      for (let i = 0; i < data.modelfbx.length; i++) {
        formData.append("modelfbx", data.modelfbx[i]);
      }
    }

    axios
      .patch(`/backend/api/v1/objects/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(updateModelSuccess(response.data.data.updatedObj));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(updateModelFail(error.response.data.message));
      });
  };
};

export const deleteModelSuccess = (id) => {
  return {
    type: actionTypes.DELETE_MODELS_SUCCESS,
    id,
  };
};

export const deleteModelFail = (error) => {
  return {
    type: actionTypes.DELETE_MODELS_FAIL,
    error,
  };
};
export const deleteModelStart = () => {
  return {
    type: actionTypes.DELETE_MODELS_START,
  };
};

export const deleteModel = (id, token) => {
  return (dispatch) => {
    dispatch(deleteModelStart());

    axios
      .delete(`/backend/api/v1/objects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("success");
        dispatch(deleteModelSuccess(id));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(deleteModelFail(error.response.data.message));
      });
  };
};

export const addModelSuccess = (model) => {
  return {
    type: actionTypes.ADD_MODELS_SUCCESS,
    model,
  };
};

export const addModelFail = (error) => {
  return {
    type: actionTypes.ADD_MODELS_FAIL,
    error,
  };
};
export const addModelStart = () => {
  return {
    type: actionTypes.ADD_MODELS_START,
  };
};

export const addModel = (data, token,arrayToPass) => {
  return (dispatch) => {
    dispatch(addModelStart());

    let newImages = [];


    for (let i = 0; i < data.images.length; i++) {
      if (arrayToPass.indexOf(data.images[i].name) !== -1) {
        newImages.push(data.images[i]);
      }
    }


    data.imageCover = data.photo;

    delete data.photo;

    const formData = new FormData();

    if (data.name.length > 0) {
      formData.append("name", data.name);
    }
    if (data.description.length > 0) {
      formData.append("description", data.description);
    }
    if (newImages.length > 0) {
      for (let i = 0; i < newImages.length; i++) {
        formData.append("images", newImages[i]);
      }
    }
    if (data.imageCover.length > 0) {
      formData.append("imageCover", data.imageCover[0]);
    }
    if (data.modelfbx.length > 0) {
      for (let i = 0; i < data.modelfbx.length; i++) {
        formData.append("modelfbx", data.modelfbx[i]);
      }
    }


    axios
      .post(`/backend/api/v1/objects/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(addModelSuccess(response.data.data.object));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(addModelFail(error.response.data.message));
      });
  };
};

export const fetchModelsSuccess = (models) => {
  return {
    type: actionTypes.FETCH_MODELS_SUCCESS,
    models,
  };
};

export const fetchModelsFail = (error) => {
  return {
    type: actionTypes.FETCH_MODELS_FAIL,
    error,
  };
};
export const fetchModelsStart = () => {
  return {
    type: actionTypes.FETCH_MODELS_START,
  };
};

export const fetchModels = (token) => {
  return (dispatch) => {
    dispatch(fetchModelsStart());
    axios
      .get(`/backend/api/v1/objects/currentUserObjects`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(fetchModelsSuccess(response.data.data.objects));
      })
      .catch((error) => {
        dispatch(fetchModelsFail(error.response.data.message));
      });
  };
};
