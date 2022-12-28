import { useEffect, useState } from "react";
import { usePageState } from "../editor/pageContext";
import { useStoryDispatch, useStoryState } from "../editor/storyContext";
import StoryCard from "./storyCard";

export default function StoryList({ data }) {
  const pagestate = usePageState();
  const storystate = useStoryState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          console.log(data);
        }}
      >
        storydata
      </button>
      {data.map((item, index) => (
        <StoryCard key={index} item={item} />
      ))}
    </>
  );
}
