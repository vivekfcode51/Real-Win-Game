import React, { createContext, useContext, useMemo, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();
// http://jupitergames.vip

export const SocketProvider = ({ children }) => {
  const domain = "https://aviatorudaan.com/";
  const socket = useMemo(() => io(domain), []);

  const [timers, setTimers] = useState({
    type1: 0,
    type2: 0,
    type3: 0,
    type4: 0,
    type5: 0,
  });

  useEffect(() => {
    const handleOneMin = (upcolor_wingo) => {
      const q = JSON.parse(upcolor_wingo);
      // console.log("Received from socket:", q);

      const { timerBetTime,oneMinTimer,threeMinTimer,fiveMinTimer,tenMinTimer } = q;
      // Calculate elapsed time from the start
      // const elapsedTime = cycleCount * 30 + (30 - timerBetTime);

      setTimers({
        type1:timerBetTime,   // 30s timer
        type2:oneMinTimer,   // 60s timer
        type3: threeMinTimer, // 180s timer
        type4: fiveMinTimer, // 300s timer
        type5: tenMinTimer, // 600s timer
      });
      // const elapsedTime = cycleCount * 30 + (30 - timerBetTime);

      // setTimers({
      //   type1: 30 - (elapsedTime % 30),   // 30s timer
      //   type2: 60 - (elapsedTime % 60),   // 60s timer
      //   type3: 180 - (elapsedTime % 180), // 180s timer
      //   type4: 300 - (elapsedTime % 300), // 300s timer
      //   type5: 600 - (elapsedTime % 600), // 600s timer
      // });
    };

    socket.on("realwin_wingo", handleOneMin);

    return () => {
      socket.off("realwin_wingo", handleOneMin);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, timers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
