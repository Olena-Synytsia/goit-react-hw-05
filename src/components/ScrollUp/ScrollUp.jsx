import { useState, useEffect } from "react";
import s from "./ScrollUp.module.css"; // Стилі для кнопки

const ScrollUp = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleScrollUp}
      className={`${s.scrollUp} ${visible ? s.visible : ""}`}
    >
      Scroll to Up
    </button>
  );
};

export default ScrollUp;
