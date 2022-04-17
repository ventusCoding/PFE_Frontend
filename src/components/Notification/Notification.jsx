import React, { useState, useEffect } from "react";
import { BellIcon } from "@chakra-ui/icons";
import { bellColor } from "../../helpers/Colors";

import "./Notification.css";
import NotificationCard from "./NotificationCard";

export default function Notification() {
  return (
    <div className="notification">
      <a href="#">
        <div className="notBtn" href="#">
          <div style={{marginLeft:-40}} className="number"> 5</div>
          <BellIcon
            style={{
              marginRight: "10px",
              background: bellColor,
              padding: "5px",
              height: "30px",
              width: "30px",
              borderRadius: "100%",
              color: "white",
            }}
          />
          <div className="box">
            <div className="display">
              <div className="nothing">
                <i className="fas fa-child stick"></i>
                <div className="cent">Looks Like your all caught up!</div>
              </div>
              <div className="cont">
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
				  <NotificationCard/>
			  </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
