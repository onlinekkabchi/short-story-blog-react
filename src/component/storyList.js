import StoryCard from "./storyCard";
import { FiShare2 } from "react-icons/fi";
import { useState } from "react";
import StoryShare from "./storyShare";

// function Tags({ data }) {
//   return (
//     <div className="story--tag-box">
//       {data.length > 0 ? (
//         data.map((item, index) => (
//           <button className="story--tag" key={index}>
//             {item}
//           </button>
//         ))
//       ) : (
//         <button className="story--tag">NOTAG</button>
//       )}
//     </div>
//   );
// }

export default function StoryList({ data }) {
  // const [sharing, setSharing] = useState(false);

  // const [storedStoryForSharing, setStoredStoryForSharing] = useState(null);

  // const handleSharing = (item) => {
  //   setStoredStoryForSharing(item);
  //   setSharing(true);
  // };

  return (
    <>
      {/* <StoryShare sharing={sharing} item={storedStoryForSharing} /> */}
      <div className="story--list">
        {data.map((item, index) => (
          <StoryCard key={index} item={item} />
          // <div key={item.order} className="story--card">
          //   <input
          //     className="story--input"
          //     type="radio"
          //     name="story--name"
          //     id={item.order}
          //   />
          //   <label className="story--label" htmlFor={item.order}>
          //     <p className="story--title">{item.storyTitle}</p>
          //     <button
          //       onClick={() => handleSharing(item)}
          //       style={{ cursor: "pointer" }}
          //     >
          //       카카오톡
          //     </button>
          //   </label>
          //   <div className="story--content">
          //     {/* <a className="story--origin-link" href={item.origin} target="blank"> */}
          //     <p className="story--content-text">{item.storyContent}</p>
          //     <Tags data={item.storyTag} />

          //     {/* {reply ? (
          //     <>
          //       <ReplyBox order={item.order} />
          //       <button onClick={offReply}>close</button>
          //     </>
          //   ) : (
          //     <>
          //       <button onClick={onReply}>replybox</button>
          //     </>
          //   )} */}
          //     {/* </a> */}
          //   </div>
          // </div>
        ))}
      </div>
    </>
  );
}
