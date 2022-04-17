import React, { useState } from "react";
import moment from "moment";

export default function NotificationCard() {
  return (

    //   {/* <div className={read ? "sec" : "sec new"}> */}
      <div className="sec new">
        <div className="profCont">
          <img
            className="profile"
            src="https://c1.staticflickr.com/5/4007/4626436851_5629a97f30_b.jpg"
            alt="img"
          />
        </div>
        <div className="txt">
          Anwer Baccar invited you to visit hk batiment!
        </div>

        <div className="txt sub">
          {/* {moment(notification.createdAt).fromNow(true)} */}
          02/15/2050
        </div>
        <div style={{ marginTop:20,marginLeft:90}}>
          <button className="btn btn-success btn-round-2">Accept</button>
          <button className="btn btn-danger btn-round-2">Decline</button>
        </div>
      </div>

  );
}
