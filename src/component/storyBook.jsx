import { createContext } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";

const StoryContext = createContext(null);

const initialStoryState = { book: [] };

function storyReducer(state, action) {
  switch (action.type) {
    case "CREATE_LIST": {
      return { book: state.book.concat(action.page) };
    }
  }
}

function StoryBook() {
  const [state, dispatch] = useReducer(storyReducer, initialStoryState);
  const [storyPack, setStoryPack] = useState([]);

  const getData = (page) => {
    dispatch({ type: "CREATE_LIST", page });
  };

  // async function getStories() {
  //   await fetch(
  //     "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/scaryStoryLazySender1"
  //   )
  //     .then((res) => res.json())
  //     .then((res) => JSON.parse(res))
  //     .then((res) => getData(res));
  // }

  // function Card(id, title, content, tagArray, origin) {
  //   const newId = Math.floor(Math.random() * 100);
  //   const tags = tagArray.map(
  //     (t) => `<button className="story--tag">${t}</button>`
  //   );

  //   return (
  //     <div className="story--card">
  //       <input
  //         className="story--input"
  //         type="radio"
  //         name="story--name"
  //         id={id + newId}
  //       />
  //       <label className="story--label" for={id + newId}>
  //         <p className="story--title">{title}</p>
  //       </label>
  //       <div className="story--content">
  //         <a className="story--origin-link" href={origin}>
  //           <p className="story--content-text">{content}</p>
  //         </a>
  //         <div className="story--tag-box">{tags}</div>
  //       </div>
  //     </div>
  //   );
  // }

  useEffect(() => {
    Promise.all(
      [
        "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/scaryStoryLazySender3",
        "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/scaryStoryLazySender2",
        "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/scaryStoryLazySender1",
      ].map(
        async (uri) =>
          await fetch(uri)
            .then((res) => res.json())
            .then((res) => JSON.parse(res))
            .then((res) => getData(res))
            .catch((err) => console.log(err))
      )
    );
  }, []);

  return (
    <StoryContext.Provider value={dispatch}>
      <div
        className="story--book"
        style={{
          position: "absolute",
          top: "120px",
          padding: "10px",
        }}
      >
        {state.book.length > 0 ? (
          state.book.map((item) => (
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
          <p
            style={{ color: "#ffffff" }}
            onClick={() => {
              console.log(state);
            }}
          >
            DB 속도가 느립니다. 3초만 기다려주세요. Wait for stories, DB is a
            bit slow..
          </p>
        )}
      </div>
    </StoryContext.Provider>
  );
}

export { StoryBook };
