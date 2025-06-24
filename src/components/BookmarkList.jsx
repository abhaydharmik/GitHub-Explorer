import React from "react";
import {
  Star,
  Bug,
  Trash2,
  GitBranch,
  Calendar,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useBookmarks } from "../context/BookmarkContext";

const BookmarkList = ({ searchTerm = "" }) => {
  const { bookmarks, removeBookmark } = useBookmarks();

  const getLanguageColor = (lang) => {
    const map = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      Go: "#00ADD8",
      Rust: "#dea584",
      "C++": "#f34b7d",
      "C#": "#239120",
      PHP: "#4F5D95",
      Ruby: "#701516",
      Swift: "#fa7343",
      Kotlin: "#A97BFF",
    };
    return map[lang] || "#6b7280";
  };

  // 🔍 Filter bookmarks based on search term
  const filteredBookmarks = bookmarks.filter((repo) =>
    `${repo.name} ${repo.description ?? ""} ${repo.owner.login}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (filteredBookmarks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10 px-4">
        <p>No bookmarks found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 px-4 sm:px-6 lg:px-10 py-8">
      {filteredBookmarks.map((repo) => (
        <div
          key={repo.id}
          className="flex flex-col justify-between bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 rounded-xl shadow-md p-5 transition-all hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 duration-200"
        >
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                className="w-8 h-8 rounded-full ring-2 ring-gray-600"
              />
              <h2 className="text-lg font-semibold text-white line-clamp-2">
                {repo.name}
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 mb-3 line-clamp-3">
              {repo.description || "No description provided."}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-2.5 text-xs text-gray-400 mb-3">
              <span className="flex items-center gap-1 text-yellow-500">
                <Star size={14} /> {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1 text-blue-500">
                <GitBranch size={14} /> {repo.forks}
              </span>
              <span className="flex items-center gap-1 text-green-500">
                <Bug size={14} /> {repo.open_issues}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDistanceToNow(new Date(repo.updated_at))} ago
              </span>
            </div>

            {/* Language */}
            {repo.language && (
              <div className="flex items-center gap-2 text-xs mb-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                ></span>
                <span className="text-gray-300">{repo.language}</span>
              </div>
            )}
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeBookmark(repo.id)}
            className="mt-4 w-full flex items-center justify-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-lg transition"
          >
            <Trash2 size={16} />
            Remove Bookmark
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
