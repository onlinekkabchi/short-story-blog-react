import { useEffect, useState } from "react";
import { usePageState } from "../editor/pageContext";
import { useStoryDispatch, useStoryState } from "../editor/storyContext";
import StoryList from "./storyList";

export default function StoryPage() {
  const pagestate = usePageState();
  const storystate = useStoryState();
  const storydispatch = useStoryDispatch();
  const [storyStore, setStoryStore] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(false);
    console.log(data);
  };

  useEffect(() => {
    if (!storystate[pagestate]) {
      setIsLoading(true);
      fetch(
        "hhttps://data.mongodb-api.com/app/young-klxvd/endpoint/lasysender",
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
      <div className="story--page">
        <StoryList data={storystate[pagestate]} />
      </div>
    );
  }

  return (
    <>
      <div className="story--page">
        {isLoading ? (
          <div className="story--loading-message">
            새 이야기 받으러 가는 중...
          </div>
        ) : (
          <></>
        )}
        {storyStore.length > 0 ? (
          <StoryList data={storyStore} />
        ) : (
          <div className="story--loading-message">
            잠깐 기다려요... wait for 3 seconds...
          </div>
        )}
      </div>
    </>
  );
}
