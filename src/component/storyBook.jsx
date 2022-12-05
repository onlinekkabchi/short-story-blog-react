import { useReducer } from "react";
import { useEffect } from "react";

const initial = {};

function storyReducer(state, action) {
  switch (action.type) {
    case "COUNT_PAGES": {
      return;
    }
    case "CREATE_LIST": {
      // const pageNum = state.book.length;
      // const pageNum = Object.keys(state).length;
      const pageNum = action.ind;
      const pageContent = action.page;
      state[pageNum] = pageContent;
      return state;
    }
  }
}

function StoryBook() {
  const [state, dispatch] = useReducer(storyReducer, initial);

  const getData = (page, ind) => {
    dispatch({ type: "CREATE_LIST", ind: ind, page: page });
  };

  // const getLastPageNumber = () =>{
  //   fetch("").then
  // }

  useEffect(() => {
    [
      "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/scaryStoryLazySender3",
      "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/scaryStoryLazySender2",
      "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/scaryStoryLazySender1",
    ].map(
      async (uri, index) =>
        await fetch(uri)
          .then((res) => res.json())
          .then((res) => JSON.parse(res))
          .then((res) => getData(res, index))
          .catch((err) => console.log(err))
    );
  }, []);

  const book = Object.keys(state).map((page) =>
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
          <a className="story--origin-link" href={item.origin} target="blank">
            <p className="story--content-text">{item.storyContent}</p>
          </a>
          <div className="story--tag-box">{item.storyTag}</div>
        </div>
      </div>
    ))
  );

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
              Object.keys(state).map((item) => {
                const i = state[item];
                console.log(i);
              });
            }}
          >
            tester
          </button>
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
          {/* {Object.keys(state).map((page, ind) =>
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
          )} */}
          {/* {Object.keys(state).map((item) => <div key={item.order} className="story--card">
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
            </div>)} */}
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
