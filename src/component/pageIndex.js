import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageDispatch, usePageState } from "../editor/pageContext";
import { usePageIndexState } from "../editor/pageIndexContext";

function PageIndexButton({ data }) {
  const navigate = useNavigate();
  const pageState = usePageState();
  const pageDispatch = usePageDispatch();
  const [clicked, clicking] = useState(false);

  const openPage = () => {
    pageDispatch({ type: "SET_PAGE", index: data });
  };

  useEffect(() => {
    if (data === pageState) {
      clicking(true);
      navigate(`/${pageState}`);
    } else {
      clicking(false);
    }
  }, [pageState, data, navigate]);

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
  const pageIndexState = usePageIndexState();

  return (
    <div className="story-index--box">
      <p className="story-index--title">page index</p>
      {pageIndexState.length > 0 ? (
        <div className="story-index--list">
          {pageIndexState.map((item, index) => (
            <PageIndexButton data={item} key={index} />
          ))}
        </div>
      ) : (
        <div className="story-index--title">괴담 목록 받아오는 중...</div>
      )}
    </div>
  );
}
