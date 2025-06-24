// src/pages/BookmarksPage.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookmarkList from "../components/BookmarkList";
import SlideInPage from "../components/SlideInPage";

const BookmarksPage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SlideInPage>
      <div className="min-h-screen bg-gradient-to-br from-blue-900/10 via-blue-900/10 to-gray-900/10 text-white">
        <Navbar />
        <div
          className={`max-w-4xl mx-auto p-4 transition-all duration-700 ease-out transform ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <BookmarkList />
        </div>
      </div>
    </SlideInPage>
  );
};

export default BookmarksPage;
