import React, { useEffect, useState } from "react";
import BookmarkList from "./BookmarkList";
import { Bookmark, X, Search } from "lucide-react";
import { useBookmarks } from "../context/BookmarkContext";

const BookmarkDrawer = ({ isOpen, onClose }) => {
  const [slideIn, setSlideIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { clearBookmarks } = useBookmarks();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      setTimeout(() => setSlideIn(true), 10);
      window.addEventListener("keydown", handleEscape);
    } else {
      setSlideIn(false);
      setSearchTerm(""); // Clear search when drawer closes
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleClearAll = () => {
    // if (window.confirm("Are you sure you want to clear all bookmarks?")) {
    // }
    clearBookmarks(); // ✅ No reload needed
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full z-50 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-md 
      w-full sm:w-1/2 max-w-md transition-transform duration-500 ease-in-out
      ${
        isOpen
          ? slideIn
            ? "translate-x-0"
            : "translate-x-full"
          : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg flex gap-2 items-center font-semibold">
          <Bookmark className="w-6 h-6 text-yellow-400" /> Bookmarked
          Repositories
        </h2>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search + Clear All */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gray-700">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <button
          onClick={handleClearAll}
          className="ml-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Bookmark List */}
      <div className="px-4 sm:px-6 md:px-8 py-6 overflow-y-auto max-h-[calc(100vh-120px)]">
        <BookmarkList searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default BookmarkDrawer;
