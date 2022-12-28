import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageDispatch } from "../editor/pageContext";

function PageIndexButtons({ data }) {
  const navigate = useNavigate();
  const pageDispatch = usePageDispatch();

  const openPage = () => {
    navigate(`/${data}`);
    console.log(data);
    pageDispatch({ type: "SET_PAGE", index: data });
  };

  return (
    <p className="story-index" onClick={openPage}>
      {data}
    </p>
  );
}

export default function PageIndex() {
  const [page, setPage] = useState([]);

  const writePageIndex = (data) => {
    const pageArr = [...Array(data).keys()];
    setPage(pageArr);
    console.log(data);
    console.log(pageArr);
  };

  useEffect(() => {
    fetch(
      "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/howManyStoriesThere"
    ).then((res) =>
      res
        .json()
        .then((res) => parseInt(res))
        .then((res) => parseInt(res / 10) + 1)
        .then((res) => writePageIndex(res))
        .catch((err) => alert("eror! : " + err))
    );
  }, []);

  return (
    <div style={{ color: "white" }}>
      <div style={{ padding: "0", margin: "0" }}>page index</div>
      {page.length > 0 ? (
        <div className="index-list">
          {page.map((item, index) => (
            <PageIndexButtons data={item} key={index} />
          ))}
        </div>
      ) : (
        <div>괴담 목록 받아오는 중...</div>
      )}
    </div>
  );
}
