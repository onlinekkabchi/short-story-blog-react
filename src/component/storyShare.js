import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function StoryShare(props) {
  const item = props.item;
  // const uri =
  const param = useParams();
  const page = param.page;
  const uri = "https://young-klxvd.mongodbstitch.com" + page;

  function shareKakao() {
    const kakao = window.Kakao;
    const kakaoKey = "4d898607886f37e71d4899421dd2651d";
    if (!kakao.isInitialized()) {
      kakao.init(kakaoKey);
    }

    // console.log("share");
    console.log(item.storyTitle);
    console.log(param);
    const title = item.storyTitle;

    kakao.Share.sendDefault({
      objectType: "text",
      text: title,
      link: {
        webUrl: "http://localhost:3000",
      },
    });
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div style={{ background: "white", color: "black" }}>
      storyShare
      <img
        onClick={() => shareKakao()}
        src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오톡 공유 보내기 버튼"
      />
    </div>
  );
}
