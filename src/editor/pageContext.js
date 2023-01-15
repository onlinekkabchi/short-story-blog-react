import { createContext, useContext, useEffect, useReducer } from "react";
import { countStory } from "./api";

const PageStateContext = createContext(null);
const PageDispatchContext = createContext(null);

const initialPage = undefined;

function pageReducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      console.log(action.index);
      return action.index;
    default:
      return;
  }
}

export function PageProvider({ children }) {
  const [state, dispatch] = useReducer(pageReducer, initialPage);

  useEffect(() => {
    countStory(dispatch);
  }, []);

  return (
    <PageStateContext.Provider value={state}>
      <PageDispatchContext.Provider value={dispatch}>
        {children}
      </PageDispatchContext.Provider>
    </PageStateContext.Provider>
  );
}

export function usePageState() {
  return useContext(PageStateContext);
}

export function usePageDispatch() {
  return useContext(PageDispatchContext);
}
