import { Outlet } from "react-router-dom";
import HeaderSlider from "./component/headerSlider";
import PageIndex from "./component/pageIndex";
import { PageProvider } from "./editor/pageContext";
import { StoryProvider } from "./editor/storyContext";

import "./style/style.css";
function App() {
  return (
    <div className="App">
      <PageProvider>
        <StoryProvider>
          <HeaderSlider />
          <PageIndex />
          <Outlet />
        </StoryProvider>
      </PageProvider>
    </div>
  );
}

export default App;
