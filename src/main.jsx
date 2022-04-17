import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/authReducer";
import modelsReducer from "./store/reducers/modelsReducer.js";
import visitsReducer from "./store/reducers/visitsReducer.js";
// 1. Import the extendTheme function

import { ChakraProvider } from "@chakra-ui/react";

const rootReducer = combineReducers({
  models: modelsReducer,
  auth: authReducer,
  visits: visitsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
