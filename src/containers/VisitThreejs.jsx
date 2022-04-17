import { useContext, useEffect, useRef, useState } from "react";
import { World } from "../engine/world";
import SocketContext from "../helpers/SocketContext.js";

import { useParams } from "react-router-dom";

export default function VisitThreejs() {
  const container = useRef(null);
  const { context, setContext } = useContext(SocketContext);
  const { id } = useParams();
  const [world, setWorld] = useState(null);

  useEffect(() => {
    return () => {
 
      if (context && context.socket  ) {
        context.socket.emit("leaveRoom", { room: id });
      }
      if ( world && world.renderer ) {
        world.renderer.forceContextLoss();
        world.renderer.dispose();
        world.sence.dispose()
        setWorld(null)
      }
      //reload the page
      // window.location.reload();
      console.log(id, "loeave");
    };
  }, []);

  useEffect(() => {
    setContext({ ...context, inRoom: id });
    if (container && context.socket) {
      localStorage.setItem("roomId", id);
      setWorld(new World(container.current, context.socket, id));
      // let loader = new World(container.current, context.socket, id);
      // window.addEventListener("resize", () => loader.dolly.resize());
    }
  }, [container, context.socket]);

  return <div className="App" ref={container}></div>;
}
