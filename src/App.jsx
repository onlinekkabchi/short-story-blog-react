import { Outlet } from "react-router-dom";
import HeaderSlider from "./component/headerSlider";
import PageIndex from "./component/pageIndex";
import { PageProvider } from "./editor/pageContext";
import { PageIndexProvider } from "./editor/pageIndexContext";
import { StoryProvider } from "./editor/storyContext";

import "./style/style.css";
function App() {
  return (
    <div className="App">
      <PageProvider>
        <StoryProvider>
          <PageIndexProvider>
            <HeaderSlider />
            <PageIndex />
            <Outlet />
          </PageIndexProvider>
        </StoryProvider>
      </PageProvider>
    </div>
  );
}

export default App;
