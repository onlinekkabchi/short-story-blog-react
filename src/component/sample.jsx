import { useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { json } from "react-router-dom";

const initial = {};

function storyReducer(state, action) {
  switch (action.type) {
    case "CREATE_LIST": {
      // const pageNum = state.book.length;
      // const pageNum = Object.keys(state).length;
      const pageNum = action.index;
      const pageContent = action.page;
      state[pageNum] = pageContent;
      return state;
    }
  }
}

function Sample() {
  const [state, dispatch] = useReducer(storyReducer, initial);
  const [page, setPage] = useState(1);
  const [pageQuery, setPageQuery] = useState({ greater: 0, lessthan: 11 });
  const [current, setCurrent] = useState(null);

  const getData = (page, index) => {
    dispatch({ type: "CREATE_LIST", index: index, page: page });
    setCurrent(state(index));
  };

  const pageUpdate = () => {
    setPageQuery({ greater: page * 10, lessthan: (page + 1) * 10 + 1 });
  };

  const renderPage = (k) => {
    console.log(k);
    setCurrent(state[k]);
    console.log(current);
  };

  useEffect(() => {
    fetch(
      "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/lazysample",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageQuery),
      }
    )
      .then((res) => res.json())
      // .then((res) => JSON.parse(res))
      .then((res) => (res.length > 0 ? getData(res, page) : null))
      .then((res) => console.log(state));
  }, [pageQuery]);

  return (
    <div
      className="story--book"
      style={{
        position: "absolute",
        top: "120px",
        padding: "10px",
      }}
    >
      <div
        className="button--box"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {Object.keys(state) ? (
          Object.keys(state).map((ki) => (
            <button key={ki} onClick={() => renderPage(ki)}>
              {ki}
            </button>
          ))
        ) : (
          <button>no story</button>
        )}
        <button
          onClick={() => {
            setPage(page + 1);
            pageUpdate();
          }}
        >
          add more story
        </button>
        <button
          onClick={() => {
            console.log(Object.keys(state));
            console.log(state);
          }}
        >
          tester
        </button>
      </div>

      {current !== null ? (
        current.map((item) => (
          <div key={item.order} className="story--card">
            <input
              className="story--input"
              type="radio"
              name="story--name"
              id={item.order}
            />
            <label className="story--label" htmlFor={item.order}>
              <p className="story--title">{item.storyTitle}</p>
            </label>
            <div className="story--content">
              <a
                className="story--origin-link"
                href={item.origin}
                target="blank"
              >
                <p className="story--content-text">{item.storyContent}</p>
              </a>
              <div className="story--tag-box">{item.storyTag}</div>
            </div>
          </div>
        ))
      ) : (
        <button>nope</button>
      )}
    </div>
  );
}

export { Sample };
