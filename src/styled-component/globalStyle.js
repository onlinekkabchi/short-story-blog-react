import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body{
        background-image:${(props) =>
          props.themeOn ? `url("./pinksolid.jpg")` : `url("./1474677.jpg")`};
    }
`;
