import { useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";

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

function StoryBook() {
  const [lastPage, setLastPage] = useState(null);
  const [state, dispatch] = useReducer(storyReducer, initial);

  const drawPage = (lastnum) => {
    const pageNum = Math.floor(lastnum / 10);
    setLastPage(pageNum);
  };

  const getData = (page, index) => {
    dispatch({ type: "CREATE_LIST", index: index, page: page });
  };

  useEffect(() => {
    fetch(
      "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/howManyStoriesThere"
    )
      .then((res) => res.json())
      .then((result) => drawPage(result))
      .then((res) => console.log("draw"))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (lastPage) {
      let promises = [];
      for (let i = 1; i <= lastPage; i++) {
        promises.push(
          `https://data.mongodb-api.com/app/application-1-qqykd/endpoint/scaryStoryLazySender${i}`
        );
      }
      promises.map(
        async (uri, index) =>
          await fetch(uri)
            .then((res) => res.json())
            .then((res) => JSON.parse(res))
            .then((res) => getData(res, index))
            .catch((err) => console.log(err))
      );
    }
  }, [lastPage, state]);

  return (
    <div
      className="story--book"
      style={{
        position: "absolute",
        top: "120px",
        padding: "10px",
      }}
    >
      {Object.keys(state).length > 0 ? (
        <>
          <button
            onClick={() => {
              console.log(Object.keys(state));
              Object.keys(state).map((item) => {
                const i = state[item];
                console.log(i);
              });
            }}
          >
            tester
          </button>
          {/* {book} */}
          {Object.keys(state).map((page) =>
            state[page].map((item) => (
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
          )}
        </>
      ) : (
        <p
          style={{ color: "#ffffff" }}
          onClick={() => {
            console.log(state);
          }}
        >
          DB 속도가 느립니다. 3초만 기다려주세요. Wait for stories, DB is a bit
          slow..
        </p>
      )}
    </div>
  );
}

export { StoryBook };
