import { useEffect, useState } from "react";
import { usePageState } from "../editor/pageContext";
import { useStoryDispatch, useStoryState } from "../editor/storyContext";
import StoryList from "./storyList";

export default function StoryPage() {
  const pagestate = usePageState();
  const storystate = useStoryState();
  const storydispatch = useStoryDispatch();
  const [storyStore, setStoryStore] = useState([]);

  const storyquery = {
    greater: new Number(pagestate) * 10,
    lessthan: (new Number(pagestate) + 1) * 10,
  };

  const setStoryForThisPage = (data) => {
    storydispatch({
      type: "SET_STORY_FOR_THIS_PAGE",
      pageindex: pagestate,
      data: data,
    });
    setStoryStore(data);
    console.log(data);
  };

  useEffect(() => {
    if (!storystate[pagestate]) {
      fetch(
        "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/lazysample",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(storyquery),
        }
      )
        .then((res) => res.json())
        .then((res) => setStoryForThisPage(res))
        .catch((err) => console.log(err));
    } else {
      console.log("contents for this page already exists, so no download");
    }
  }, [pagestate]);

  if (storystate[pagestate]) {
    return (
      <div style={{ color: "white" }}>
        storypage
        <button
          onClick={() => {
            console.log(storystate);
            console.log(storyStore);
          }}
        >
          current page
        </button>
        {pagestate}
        <StoryList data={storystate[pagestate]} />
      </div>
    );
  }

  return (
    <>
      <div style={{ color: "#ffffff" }}>
        <button
          onClick={() => {
            console.log(storyStore);
            console.log(storyStore.length);
          }}
        >
          button
        </button>
        {storyStore.length > 0 ? (
          <StoryList data={storyStore} />
        ) : (
          <div>스토리받아오는중?</div>
        )}
      </div>
    </>
  );
}
