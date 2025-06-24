import React, { useState, useEffect } from "react";
import {
  Star,
  GitBranch,
  Bug,
  Bookmark,
  BookmarkCheck,
  StickyNote,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useBookmarks } from "../context/BookmarkContext";
import { motion } from "framer-motion";

const RepoCard = ({ repo }) => {
  const [flipped, setFlipped] = useState(false);
  const [note, setNote] = useState("");

  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(repo.id);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("githubNotes")) || {};
    if (storedNotes[repo.id]) setNote(storedNotes[repo.id]);
  }, [repo.id]);

  const handleBookmarkToggle = () => {
    bookmarked ? removeBookmark(repo.id) : addBookmark(repo);
  };

  const handleSaveNote = () => {
    const storedNotes = JSON.parse(localStorage.getItem("githubNotes")) || {};
    storedNotes[repo.id] = note;
    localStorage.setItem("githubNotes", JSON.stringify(storedNotes));
    setFlipped(false);
  };

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

  return (
    <div className="relative w-full h-[300px] perspective">
      <motion.div
        className="relative w-full h-full transform-style preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden">
          <div className="flex flex-col h-full bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 rounded-xl shadow-md p-5 transition-all hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 duration-200 group">
            <div className="flex gap-3 items-center">
              <img
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                className="w-9 h-9 rounded-full ring-2 ring-gray-600"
              />
              <h2 className="text-lg font-semibold group-hover:text-blue-400 text-white flex-1 overflow-hidden leading-tight line-clamp-2">
                {repo.name}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-white my-3 sm:my-4 leading-relaxed group-hover:text-gray-400 overflow-hidden line-clamp-3 break-words">
              {repo.description || "No description available."}
            </p>

            <div className="mt-auto flex flex-col gap-2">
              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1 text-blue-400">
                  <GitBranch size={14} /> {repo.forks}
                </span>
                <span className="flex items-center gap-1 text-green-400">
                  <Bug size={14} /> {repo.open_issues}
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Calendar size={14} />
                  {formatDistanceToNow(new Date(repo.updated_at))} ago
                </span>
              </div>

              {/* Language */}
              {repo.language && (
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  ></span>
                  <span>{repo.language}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-700">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink size={16} />
                  View Repo
                </a>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFlipped(true)}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    title="Add Note"
                  >
                    <StickyNote size={18} className="text-yellow-500" />
                  </button>
                  <button
                    onClick={handleBookmarkToggle}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
                  >
                    {bookmarked ? (
                      <BookmarkCheck size={18} className="text-green-500" />
                    ) : (
                      <Bookmark size={18} className="text-blue-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="flex flex-col h-full bg-gray-900 text-white border border-gray-700 rounded-xl shadow-md p-5">
            <h3 className="text-lg font-semibold mb-4">Your Notes</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add your notes"
              className="w-full h-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md placeholder-gray-400 text-sm resize-none"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setFlipped(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Style for 3D effect */}
      <style>{`
        .perspective {
          perspective: 1200px;
        }
        .transform-style {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default RepoCard;
