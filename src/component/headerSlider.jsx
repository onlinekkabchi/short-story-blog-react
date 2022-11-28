import { useEffect, useState } from "react";

function HeaderSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = [
    {
      title: "프론트 개발자의 미니 괴담 블로그",
      miniTitle: "Front-end Developer's Scary Story Mini Blog",
      adress: undefined,
    },
    {
      title: "CSR Page",
      miniTitle:
        ": ReactJs, Sass, MongoDB(DB, Hosting Service, Serverless Function)",
      adress: undefined,
    },
    {
      title: "github.com/onlinekkabchi",
      miniTitle: "주소를 클릭하면 개발자 깃허브로 이동합니다.",
      adress: "http://github.com/onlinekkabchi",
    },
  ];
  const sliderScroll = () => {
    if (-currentIndex >= data.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex - 1);
  };
  const headerSliderLeftBtn = (e) => {
    e.preventDefault();
    if (0 > currentIndex) {
      return setCurrentIndex(currentIndex + 1);
    }
  };
  const headerSliderRightBtn = (e) => {
    e.preventDefault();
    if (-currentIndex < data.length - 1) {
      return setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const Interval = setInterval(() => {
      console.log("interval");
      console.log(currentIndex);
      sliderScroll();
    }, 10000);
    return () => clearInterval(Interval);
  });

  return (
    <div className="slider-container">
      <button className="slide-arrow prev-arrow" onClick={headerSliderLeftBtn}>
        &#8249;
      </button>
      <div className="slides-box">
        {data.map((item, index) => {
          return (
            <div
              className="slide"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#ffffff",
                transform: `translate(${(index + currentIndex) * 100}%)`,
              }}
              key={index}
            >
              <a
                href={item.adress}
                style={{
                  textDecoration: "none",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </a>
              <p
                style={{
                  fontSize: "10px",
                  color: "#ffffff",
                  marginTop: "2px",
                }}
              >
                {item.miniTitle}
              </p>
            </div>
          );
        })}
      </div>
      <button className="slide-arrow next-arrow" onClick={headerSliderRightBtn}>
        &#8250;
      </button>
    </div>
  );
}

export default HeaderSlider;
