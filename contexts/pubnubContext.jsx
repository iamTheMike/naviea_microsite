import Pubnub from "pubnub";
import { pubnubReducer } from "./pubnubReducer";

const { createContext, useReducer, useEffect, useContext } = require("react");
// const PubNub = require("pubnub");

// const pubnub = new Pubnub({
//   publishKey: "pub-c-083f193e-13d6-4eb7-ae51-80e3779c75bf",
//   subscribeKey: "sub-c-4ae15302-e457-4f41-b674-dad9f2e61a12",
//   userId: "user-1",
// });



const initialPubnubState = {
  pubnub: null,
  message: null,
};

const PubnubContext = createContext();

export const PubnubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pubnubReducer, initialPubnubState);
  // const listener = {
  //   status: (statusEvent) => {
  //     if (statusEvent.category === "PNConnectedCategory") {
  //       console.log("Connected");
  //     }

  //   },
  //   message: (messageEvent) => {
  //     showMessage(messageEvent.message.description);
  //     console.log(messageEvent.message);
  //     dispatch({
  //       type: "SET_MESSAGE",
  //       payload: messageEvent.message,
  //     })
  //   },
  //   presence: (presenceEvent) => {
  //     // handle presence
  //   },
  // };

  // pubnub.addListener(listener);

  // useEffect(() => {
  //   if (!state?.pubnub) return;
  //   pubnub.subscribe({
  //     channels: ["nestle"]
  //   });
    
  // }, [state]);

  // useEffect(() => {
  //   if (!pubnub) return;

  //   dispatch({
  //     type: "SET_PUBNUB",
  //     payload: pubnub,
  //   });
  // }, []);

  return (
    <PubnubContext.Provider value={...state}>{children}</PubnubContext.Provider>
  );
};

export const usePubnubContext = () => {
  return useContext(PubnubContext);
};
