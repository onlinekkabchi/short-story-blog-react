import StoryCard from "./storyCard";

export default function StoryList({ data }) {
  return (
    <>
      <div className="story--list">
        {data.map((item, index) => (
          <StoryCard key={index} item={item} />
        ))}
      </div>
    </>
  );
}
