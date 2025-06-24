import { createContext, useContext, useEffect, useState } from "react";
import { Star, AlertCircle, Trash2, TrashIcon } from "lucide-react";
import toast from "react-hot-toast"; // ✅ import toast

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("githubBookmarks")) || [];
    setBookmarks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("githubBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (repo) => {
    if (!bookmarks.find((r) => r.id === repo.id)) {
      setBookmarks((prev) => [...prev, repo]);
      toast.custom(
        <div className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
          <Star className="text-yellow-400 w-4 h-4" />
          <span>Repository bookmarked!</span>
        </div>
      );
    } else {
      toast.custom(
        <div className="flex items-center gap-2 bg-yellow-800 text-white px-4 py-2 rounded shadow-lg">
          <AlertCircle className="text-yellow-300 w-4 h-4" />
          <span>Already bookmarked!</span>
        </div>
      );
    }
  };

  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((r) => r.id !== id));

    toast.custom(
      <div className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded shadow-lg">
        <Trash2 className="w-4 h-4 text-white" />
        <span>Removed from bookmarks</span>
      </div>
    );
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem("githubBookmarks");

    toast.custom(
      <div className="flex items-center gap-2 bg-yellow-700 text-white px-4 py-2 rounded shadow-lg">
        <TrashIcon className="w-4 h-4 text-white" />
        <span>Cleared all bookmarks</span>
      </div>
    );
  };

  const isBookmarked = (id) => bookmarks.some((r) => r.id === id);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        clearBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
