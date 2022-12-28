import StoryCard from "./storyCard";

export default function StoryList({ data }) {
  return (
    <>
      {data.map((item, index) => (
        <StoryCard key={index} item={item} />
      ))}
    </>
  );
}
