import { useLoaderData, Link, Outlet } from "react-router-dom";
import HeaderSlider from "./component/headerSlider";
import { StoryBook } from "./component/storyBook";
import { Sample } from "./component/sample";
import "./style/style.css";
function App() {
  return (
    <div className="App">
      <HeaderSlider />
      <Sample />
      <Outlet />
    </div>
  );
}

export default App;
