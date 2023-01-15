import { useEffect, useState } from "react";
import { getReplyList, sendReplyRequest } from "../editor/api";
import { ReplyProvider } from "../editor/replyContext";

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

function ReplyBox({ order }) {
  const [nickName, setNickName] = useState("");
  // const [newNickName, setNewNickName] = useState("");
  const [pwd, setPwd] = useState("");
  const [replyText, setReplyText] = useState("");

  const handleNickName = (event) => {
    setNickName(event.target.value);
  };

  const handlePwd = (event) => {
    setPwd(event.target.value);
  };

  const handleReplyText = (event) => {
    setReplyText(event.target.value);
  };

  const sendReply = () => {
    if (nickName.length > 0 && pwd.length > 5 && replyText.length > 0) {
      sendReplyRequest({
        nickname: nickName,
        pwd: pwd,
        reply: replyText,
        order: order,
      });
      console.log(nickName, pwd, replyText);
      setNickName("");
      setPwd("");
      setReplyText("");
    } else if ((nickName.length = 0)) {
      console.log("nickname 길이부족");
    } else if (pwd.length <= 5) {
      console.log("pwd 길이부족");
    } else if ((replyText.length = 0)) {
      console.log("댓글 길이 부족");
    }
  };

  useEffect(() => {
    getReplyList({ order: order });
  }, []);

  return (
    <div>
      <div>
        <div>
          <input
            onChange={handleNickName}
            type="text"
            placeholder="닉네임/nickname"
            value={nickName}
          />
          <input
            onChange={handlePwd}
            type="text"
            placeholder="비밀번호/password"
            value={pwd}
          />
        </div>
        <input
          onChange={handleReplyText}
          type="text"
          placeholder="댓글쓰기/write something"
          value={replyText}
        />
        <button onClick={sendReply}>등록</button>
      </div>
    </div>
  );
}

export default function StoryCard({ item }) {
  const [reply, setReply] = useState(false);

  const onReply = () => {
    setReply(true);
  };

  const offReply = () => {
    setReply(false);
  };

  return (
    <ReplyProvider>
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
          {/* <a className="story--origin-link" href={item.origin} target="blank"> */}
          <p className="story--content-text">{item.storyContent}</p>
          <Tags data={item.storyTag} />

          {/* {reply ? (
            <>
              <ReplyBox order={item.order} />
              <button onClick={offReply}>close</button>
            </>
          ) : (
            <>
              <button onClick={onReply}>replybox</button>
            </>
          )} */}
          {/* </a> */}
        </div>
      </div>
    </ReplyProvider>
  );
}
