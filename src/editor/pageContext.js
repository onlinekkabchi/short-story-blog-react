import { createContext, useContext, useReducer } from "react";

const PageStateContext = createContext(null);
const PageDispatchContext = createContext(null);

const initialPage = 0;

function pageReducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return action.index;
    default:
      break;
  }
}

export function PageProvider({ children }) {
  const [state, dispatch] = useReducer(pageReducer, initialPage);

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
