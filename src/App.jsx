import { useLoaderData, Link, Outlet } from "react-router-dom";
import HeaderSlider from "./component/headerSlider";
import "./style/style.css";
function App() {
  return (
    <div className="App">
      <HeaderSlider />
      <div>
        <Link to={"storybook"}>stories</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
