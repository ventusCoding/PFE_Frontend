import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";

const initialState = {
  models: [],
  loading: false,
  error: null,
  success: '',
};

const updateModelStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const updateModelSuccess = (state, action) => {

  const newModels = state.models.map((model) => {
    if (model._id === action.model._id) {
      return action.model;
    }
    return model;
  });

  return updateObject(state, {
    models: newModels,
    loading: false,
    success: 'reload',
  });

};

const updateModelFail = (state, action) => {
  // console.log(action);
  return updateObject(state, { error: action.error, loading: false });
};

const deleteModelStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const deleteModelSuccess = (state, action) => {
  console.log("reducer : ", action);

  const newModels = state.models.filter((model) => model._id !== action.id);

  console.log("new models: ", newModels);

  return updateObject(state, {
    models: newModels,
    loading: false,
    success: 'navigate',
  });
};

const deleteModelFail = (state, action) => {
  // console.log(action);
  return updateObject(state, { error: action.error, loading: false });
};

const addModelStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const addModelSuccess = (state, action) => {
  const newModel = updateObject(action.model);
  return updateObject(state, {
    loading: false,
    models: state.models.concat(newModel),
    success: 'navigate',
  });
};

const addModelFail = (state, action) => {
  // console.log(action);
  return updateObject(state, { error: action.error, loading: false });
};

const fetchModelsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchModelsSuccess = (state, action) => {
  return updateObject(state, {
    models: action.models,
    loading: false,
  });
};

const fetchModelsFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const modelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MODELS_START:
      return fetchModelsStart(state, action);
    case actionTypes.FETCH_MODELS_SUCCESS:
      return fetchModelsSuccess(state, action);
    case actionTypes.FETCH_MODELS_FAIL:
      return fetchModelsFail(state, action);

    case actionTypes.ADD_MODELS_START:
      return addModelStart(state, action);
    case actionTypes.ADD_MODELS_SUCCESS:
      return addModelSuccess(state, action);
    case actionTypes.ADD_MODELS_FAIL:
      return addModelFail(state, action);

    case actionTypes.DELETE_MODELS_START:
      return deleteModelStart(state, action);
    case actionTypes.DELETE_MODELS_SUCCESS:
      return deleteModelSuccess(state, action);
    case actionTypes.DELETE_MODELS_FAIL:
      return deleteModelFail(state, action);

    case actionTypes.UPDATE_MODELS_START:
      return updateModelStart(state, action);
    case actionTypes.UPDATE_MODELS_SUCCESS:
      return updateModelSuccess(state, action);
    case actionTypes.UPDATE_MODELS_FAIL:
      return updateModelFail(state, action);

    default:
      return state;
  }
};

export default modelsReducer;
