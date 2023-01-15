import { createContext, useContext, useEffect, useReducer } from "react";
import { createPageIndex } from "./api";

const PageIndexStateContext = createContext(null);
const PageIndexDispatchContext = createContext(null);

const initialIndex = [];

function pageIndexReducer(state, action) {
  switch (action.type) {
    case "SET_PAGE_INDEX":
      const newIndexList = [...Array(action.index).keys()];
      return newIndexList;
    default:
      return;
  }
}

export function PageIndexProvider({ children }) {
  const [state, dispatch] = useReducer(pageIndexReducer, initialIndex);

  useEffect(() => {
    createPageIndex(dispatch);
  }, []);

  return (
    <PageIndexStateContext.Provider value={state}>
      <PageIndexDispatchContext.Provider value={dispatch}>
        {children}
      </PageIndexDispatchContext.Provider>
    </PageIndexStateContext.Provider>
  );
}

export function usePageIndexState() {
  return useContext(PageIndexStateContext);
}

export function usePageIndexDispatch() {
  return useContext(PageIndexDispatchContext);
}
