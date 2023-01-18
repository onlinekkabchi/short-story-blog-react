import { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderSlider from "./component/headerSlider";
import PageIndex from "./component/pageIndex";
import { PageProvider } from "./editor/pageContext";
import { PageIndexProvider } from "./editor/pageIndexContext";
import { StoryProvider } from "./editor/storyContext";
import { GlobalStyle } from "./styled-component/globalStyle";

import "./style/style.css";
function App() {
  const [themeOn, setThemeOn] = useState(false);

  const onAndOffTheme = () => {
    if (themeOn) {
      setThemeOn(false);
    } else {
      setThemeOn(true);
    }
  };

  return (
    <GlobalStyle>
      <div className="App">
        <PageProvider>
          <StoryProvider>
            <PageIndexProvider>
              <HeaderSlider />

              <PageIndex />

              <button onClick={onAndOffTheme}>pink theme</button>
              <Outlet />
            </PageIndexProvider>
          </StoryProvider>
        </PageProvider>
      </div>
    </GlobalStyle>
  );
}

export default App;
