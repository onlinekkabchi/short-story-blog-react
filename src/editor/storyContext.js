import { createContext, useContext, useReducer } from "react";

const StoryStateContext = createContext(null);
const StoryDispatchContext = createContext(null);

const initialList = {};

function storyReducer(state, action) {
  switch (action.type) {
    case "SET_STORY_FOR_THIS_PAGE":
      state[action.pageindex] = action.data;
      return state;
    default:
      break;
  }
}

export function StoryProvider({ children }) {
  const [state, dispatch] = useReducer(storyReducer, initialList);

  return (
    <StoryStateContext.Provider value={state}>
      <StoryDispatchContext.Provider value={dispatch}>
        {children}
      </StoryDispatchContext.Provider>
    </StoryStateContext.Provider>
  );
}

export function useStoryState() {
  return useContext(StoryStateContext);
}

export function useStoryDispatch() {
  return useContext(StoryDispatchContext);
}
