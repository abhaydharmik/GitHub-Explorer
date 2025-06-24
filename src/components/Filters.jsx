import React from "react";
import { Star, GitFork, Clock } from "lucide-react";

const Filters = ({ currentSort, setSort }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start items-center text-center">
      <button
        onClick={() => currentSort !== "stars" && setSort("stars")}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition border
          ${
            currentSort === "stars"
              ? "text-white border-2 border-blue-700 shadow-lg shadow-blue-400/10"
              : "text-gray-400 border-gray-600 hover:shadow-md hover:shadow-blue-500/10"
          }
        `}
      >
        <Star size={16} />
        Stars
      </button>

      <button
        onClick={() => currentSort !== "forks" && setSort("forks")}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition border
          ${
            currentSort === "forks"
              ? "text-white border-2 border-blue-700 shadow-lg shadow-blue-400/10"
              : "text-gray-400 border-gray-600 hover:shadow-md hover:shadow-blue-500/10"
          }
        `}
      >
        <GitFork size={16} />
        Forks
      </button>

      <button
        onClick={() => currentSort !== "updated" && setSort("updated")}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition border
          ${
            currentSort === "updated"
              ? "text-white border-2 border-blue-700 shadow-lg shadow-blue-400/10"
              : "text-gray-400 border-gray-600 hover:shadow-md hover:shadow-blue-500/10"
          }
        `}
      >
        <Clock size={16} />
        Updated
      </button>
    </div>
  );
};

export default Filters;
