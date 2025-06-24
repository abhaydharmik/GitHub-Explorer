import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Bookmark,
  BarChart3,
  TrendingUp,
  SearchIcon,
  Github,
  HomeIcon,
  Globe,
  Heart,
} from "lucide-react";

const Navbar = ({ onToggleBookmarks, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Close mobile menu with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() && onSearch) {
        onSearch(searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const navLinkClasses = (path) =>
    `${
      currentPath === path
        ? "text-white font-semibold bg-blue-600 rounded-md shadow-md"
        : "text-gray-300"
    } flex gap-2 items-center px-2 py-2 hover:text-white transition duration-200`;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/70 backdrop-blur border-b border-gray-700/40 shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl flex gap-2 items-center font-bold text-white hover:text-gray-400"
        >
          <Github className="w-8 h-8" />
          GitHub Explorer
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-700/50">
            <Link to="/" className={navLinkClasses("/")}>
              <HomeIcon className="w-5 h-5" /> Home
            </Link>
            <Link to="/trending" className={navLinkClasses("/trending")}>
              <TrendingUp className="w-5 h-5" /> Trending
            </Link>
            <Link to="/search" className={navLinkClasses("/search")}>
              <SearchIcon className="w-5 h-5" /> Search
            </Link>
            <Link to="/stats" className={navLinkClasses("/stats")}>
              <BarChart3 className="w-5 h-5" /> Stats
            </Link>
          </div>

          {/* Bookmarks Button */}
          <button
            onClick={onToggleBookmarks}
            className="flex gap-2 items-center px-4 py-3 bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 rounded-lg hover:bg-yellow-600/30 transition-transform duration-200 hover:scale-105"
            title="Bookmarks"
          >
            <Bookmark className="w-5 h-5" />
            Bookmarks
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#161b22] z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-6 py-6 space-y-6 relative">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Mobile Nav Links */}
          <nav className="mt-12 flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center text-white text-base md:text-lg gap-3 px-3 py-2 rounded-lg hover:bg-blue-600/10 hover:text-blue-400 transition duration-200"
            >
              <HomeIcon className="w-5 h-5" />
              Home
            </Link>

            <Link
              to="/trending"
              onClick={() => setMenuOpen(false)}
              className="flex items-center text-white text-base md:text-lg gap-3 px-3 py-2 rounded-lg hover:bg-blue-600/10 hover:text-blue-400 transition duration-200"
            >
              <TrendingUp className="w-5 h-5" />
              Trending
            </Link>

            <Link
              to="/search"
              onClick={() => setMenuOpen(false)}
              className="flex items-center text-white text-base md:text-lg gap-3 px-3 py-2 rounded-lg hover:bg-blue-600/10 hover:text-blue-400 transition duration-200"
            >
              <SearchIcon className="w-5 h-5" />
              Search
            </Link>

            <Link
              to="/stats"
              onClick={() => setMenuOpen(false)}
              className="flex items-center text-white text-base md:text-lg gap-3 px-3 py-2 rounded-lg hover:bg-blue-600/10 hover:text-blue-400 transition duration-200"
            >
              <BarChart3 className="w-5 h-5" />
              Stats
            </Link>

            <button
              onClick={() => {
                onToggleBookmarks?.();
                setMenuOpen(false);
              }}
              className="flex items-center text-white text-base md:text-lg gap-3 px-3 py-2 rounded-lg hover:bg-yellow-500/10 hover:text-yellow-400 transition duration-200 text-left"
            >
              <Bookmark className="w-5 h-5" />
              Bookmarks
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
