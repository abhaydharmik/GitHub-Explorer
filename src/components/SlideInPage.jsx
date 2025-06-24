// src/components/SlideInPage.jsx
import { useEffect, useState } from "react";

const SlideInPage = ({ children }) => {
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlide(true), 10); // allow CSS to apply
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transform transition-transform duration-500 ease-in-out ${
        slide ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {children}
    </div>
  );
};

export default SlideInPage;
