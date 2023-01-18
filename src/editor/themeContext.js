import { createContext, useContext, useReducer } from "react";

const ThemeStateContext = createContext(null);
const ThemeDispatchContext = createContext(null);

const initialTheme = {};

function themeReducer(state, action) {
  switch (action.type) {
    case "DARK_THEME":
      return {};
    case "PINK_THEME":
      return {};
    default:
      break;
  }
}
