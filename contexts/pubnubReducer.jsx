export const SET_PUBNUB = "SET_PUBNUB";
export const SET_MESSAGE = "SET_MESSAGE";

export const pubnubReducer = (state, action) => {
  switch (action.type) {
    case SET_PUBNUB:
      return {
        ...state,
        pubnub: action.payload,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
