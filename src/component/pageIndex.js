import { countStory } from "../editor/api";

export default function PageIndex() {
  return (
    <div style={{ color: "white" }}>
      index
      <button onClick={countStory}>count</button>
    </div>
  );
}
