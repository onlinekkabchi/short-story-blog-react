import { useLoaderData, Link, Outlet } from "react-router-dom";
import HeaderSlider from "./component/headerSlider";
import PageIndex from "./component/pageIndex";

import "./style/style.css";
function App() {
  return (
    <div className="App">
      <HeaderSlider />
      <PageIndex />
      <Outlet />
    </div>
  );
}

export default App;
