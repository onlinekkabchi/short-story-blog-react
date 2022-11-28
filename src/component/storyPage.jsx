import { createContext } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";

const StoryContext = createContext(null);

const initialStoryState = {
  book: [
    {
      storyTitle: "example",
      storyContent: "example",
      storyOrigin: "example",
      storyTag: ["none"],
      order: 10000,
    },
  ],
};

function storyReducer(state, action) {
  switch (action.type) {
    case "CREATE_LIST":
      return {
        book: state.book.concat(action.book),
      };
  }
}

function Card(id, title, content, tagArray, origin) {
  const newId = Math.floor(Math.random() * 100);
  const tags = tagArray.map(
    (t) => `<button className="story--tag">${t}</button>`
  );

  return (
    <div className="story--card">
      <input
        className="story--input"
        type="radio"
        name="story--name"
        id={id + newId}
      />
      <label className="story--label" for={id + newId}>
        <p className="story--title">{title}</p>
      </label>
      <div className="story--content">
        <a className="story--origin-link" href={origin}>
          <p className="story--content-text">{content}</p>
        </a>
        <div className="story--tag-box">{tags}</div>
      </div>
    </div>
  );
}

function StoryBook() {
  const [state, dispatch] = useReducer(storyReducer, initialStoryState);
  const [storyPack, setStoryPack] = useState([]);

  // const storyDataUrl = `https://data.mongodb-api.com/app/application-1-qqykd/endpoint/scaryStoryLazySender${num}`;

  const getData = () => {
    console.log(storyPack);
    console.log(typeof storyPack);
    console.log(storyPack[1]);
  };

  useEffect(() => {
    fetch(
      "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/scaryStoryLazySender1"
    )
      .then((res) => res.json())
      .then((res) => JSON.parse(res))

      // .then((result) => console.log(result));
      .then((result) => setStoryPack(result));
  }, []);

  const tags = (tagArray) =>
    tagArray.map((t) => `<button className="story--tag">${t}</button>`);

  return (
    <StoryContext.Provider>
      <div className="story--book" style={{ color: "#ffffff" }}>
        {storyPack ? (
          storyPack.map((item, index) => (
            <div key={item.order} className="story--card">
              <input
                className="story--input"
                type="radio"
                name="story--name"
                id={item.order}
              />
              <label className="story--label" for={item.order}>
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
          <p>no story</p>
        )}
      </div>
    </StoryContext.Provider>
  );
}

export { StoryBook, Card };
