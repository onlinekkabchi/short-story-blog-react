import { useEffect, useMemo } from "react";
import { getPage } from "../editor/api";
import { usePageState } from "../editor/pageContext";
import { useStoryDispatch, useStoryState } from "../editor/storyContext";
import StoryList from "./storyList";

export default function StoryPage() {
  const pagestate = usePageState();
  const storystate = useStoryState();
  const storydispatch = useStoryDispatch();

  const storyquery = {
    greater: new Number(pagestate) * 10,
    lessthan: (new Number(pagestate) + 1) * 10,
  };

  useEffect(() => {
    if (!storystate.hasOwnProperty(pagestate)) {
      getPage(storydispatch, storyquery, pagestate);
    }
  }, [pagestate, storystate, storydispatch, storyquery]);

  return (
    <>
      <div className="story--page">
        {storystate.hasOwnProperty(pagestate) ? (
          <StoryList data={storystate[pagestate]} />
        ) : (
          <div
            className="story--loading-message"
            onClick={() => {
              console.log(storystate);
            }}
          >
            새 이야기 받으러 가는 중... wait for new stories...
          </div>
        )}
      </div>
    </>
  );
}
