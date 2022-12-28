import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageDispatch, usePageState } from "../editor/pageContext";

function PageIndexButton({ data }) {
  const navigate = useNavigate();
  const pageState = usePageState();
  const pageDispatch = usePageDispatch();
  const [clicked, clicking] = useState(false);

  const openPage = () => {
    navigate(`/${data}`);
    pageDispatch({ type: "SET_PAGE", index: data });
  };

  useEffect(() => {
    if (data === pageState) {
      clicking(true);
    } else {
      clicking(false);
    }
  }, [pageState]);

  return (
    <p
      className={clicked ? "story-index index-on" : "story-index index-off"}
      onClick={openPage}
    >
      {data}
    </p>
  );
}

export default function PageIndex() {
  const [page, setPage] = useState([]);
  const pageDispatch = usePageDispatch();
  const navigate = useNavigate();

  const writePageIndex = (data) => {
    const pageArr = [...Array(data).keys()];
    setPage(pageArr);
    init(pageArr);
  };

  const init = (initdata) => {
    const lastPage = initdata.length - 1;
    pageDispatch({ type: "SET_PAGE", index: lastPage });
    navigate(`/${lastPage}`);
    console.log(lastPage);
  };

  useEffect(() => {
    fetch(
      "https://data.mongodb-api.com/app/young-klxvd/endpoint/storycounter"
    ).then((res) =>
      res
        .json()
        .then((res) => parseInt(res))
        .then((res) => parseInt(res / 10) + 1)
        .then((res) => writePageIndex(res))
        .catch((err) => alert("index error! : " + err))
    );
  }, []);

  return (
    <div className="story-index--box">
      <p className="story-index--title">page index</p>
      {page.length > 0 ? (
        <div className="story-index--list">
          {page.map((item, index) => (
            <PageIndexButton data={item} key={index} />
          ))}
        </div>
      ) : (
        <div className="story-index--title">괴담 목록 받아오는 중...</div>
      )}
    </div>
  );
}
