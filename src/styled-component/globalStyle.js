import { createGlobalStyle } from "styled-components";
import forest from "./img/1474677.jpg";
import pinkbackground from "./img/pinksolid.jpg";

export const GlobalStyle = createGlobalStyle`
    body{
        background: url(${(props) =>
          props.themeOn ? forest : pinkbackground}) no-repeat top center;
    }
`;
