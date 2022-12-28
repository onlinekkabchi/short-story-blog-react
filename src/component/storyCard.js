function Tags({ data }) {
  return (
    <div className="story--tag-box">
      {data.length > 0 ? (
        data.map((item, index) => (
          <button className="story--tag" key={index}>
            {item}
          </button>
        ))
      ) : (
        <button className="story--tag">NOTAG</button>
      )}
    </div>
  );
}

export default function StoryCard({ item }) {
  return (
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
        <Tags data={item.storyTag} />
      </div>
    </div>
  );
}
