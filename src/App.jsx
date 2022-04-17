import Navbar from "./components/Navbar.jsx";
import Home from "./containers/Home.jsx";
import Login from "./containers/Login.jsx";
import Register from "./containers/Register.jsx";
import Models from "./containers/Models.jsx";
import VisitDetail from "./containers/VisitDetail.jsx";
import ViewModel from "./containers/ViewModel.jsx";
import BelongVisits from "./containers/BelongVisits.jsx";
import VisitThreejs from "./containers/VisitThreejs.jsx";

import { Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState, useContext, createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "./store/actions/index";
import Visits from "./containers/Visits.jsx";
import AddNewModel from "./containers/AddNewModel.jsx";
import AddNewVisit from "./containers/AddNewVisit.jsx";
import { io } from "socket.io-client";
import SocketContext from "./helpers/SocketContext.js";

function App() {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const { checkAuthState } = bindActionCreators(actionCreators, dispatch);
  const [context, setContext] = useState({
    socket: null,
    inRoom: null,
    prvRoom: null,
  });

  useEffect(() => {
    checkAuthState();
    const roomId = localStorage.getItem("roomId")
    if (context.socket && roomId) {
      context.socket.emit("leaveRoom", { room: roomId });
    }
    if (context.socket === null && state.auth.token) {
      setContext({
        ...context,
        socket: io("http://localhost:8000", {
          auth: {
            token: state.auth.token,
          },
        }),
      });
    }

    if (context.socket) {
      context.socket.on("error", () => {
        console.log("socket error");
      });

      context.socket.on("reconnect", () => {
        console.log("socket reconnect");
      });

      context.socket.on("disconnect", () => {
        console.log("socket disconnect");
      });
    }
  }, [state.auth.isAuthenticated, context.socket]);

  return (
    <SocketContext.Provider value={{ context, setContext }}>
      <div style={{ backgroundColor: "#CEDAE6" }}>
        {state.auth.authResult ? (
          <Router>
            {state.auth.isAuthenticated ? (
              <React.Fragment>
                <Navbar />
                <Routes>
                  {state.auth.user.role.localeCompare("premium") === 0 ? (
                    <React.Fragment>
                      <Route exact path="/" element={<Models />} />
                      <Route exact path="/myVisits/" element={<Visits />} />
                      <Route
                        exact
                        path="/visits/:id"
                        element={<VisitDetail />}
                      />
                      <Route exact path="/models/:id" element={<ViewModel />} />
                      <Route
                        exact
                        path="/addNewModel"
                        element={<AddNewModel />}
                      />
                      <Route
                        exact
                        path="/addNewVisit"
                        element={<AddNewVisit />}
                      />
                    </React.Fragment>
                  ) : (
                    <Route exact path="/" element={<Home />} />
                  )}

                  <Route
                    exact
                    path="/belongVisits"
                    element={<BelongVisits />}
                  />
                  <Route
                    exact
                    path="/visits/:id/visit"
                    element={<VisitThreejs />}
                  />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </React.Fragment>
            ) : (
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
              </Routes>
            )}
          </Router>
        ) : (
          <div> Loading ...</div>
        )}
      </div>
    </SocketContext.Provider>
  );
}

export default App;
