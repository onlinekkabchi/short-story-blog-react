import { createContext, useContext, useEffect, useReducer } from "react";

const ReplyStateContext = createContext(null);
const ReplyDispatchContext = createContext(null);

const initialReplyList = [];

function replyReducer(state, action) {
  switch (action.type) {
    case "SET_REPLY":
      return [...state, action.reply];

    default:
      break;
  }
}

export function ReplyProvider({ children }) {
  const [state, dispatch] = useReducer(replyReducer, initialReplyList);

  return (
    <ReplyStateContext.Provider value={state}>
      <ReplyDispatchContext.Provider value={dispatch}>
        {children}
      </ReplyDispatchContext.Provider>
    </ReplyStateContext.Provider>
  );
}

export function useReplystate() {
  return useContext(ReplyStateContext);
}

export function useReplyDispatch() {
  return useContext(ReplyDispatchContext);
}
