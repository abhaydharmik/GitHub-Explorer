import React, { useState, useEffect } from "react";
import { Search, Filter, X, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookmarkDrawer from "../components/BookmarkDrawer";
import RepoCardGrid from "../components/RepoCardGrid";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal"; 

const POPULAR_LANGUAGES = [
  "all", "JavaScript", "TypeScript", "Python", "Java", "Go", "Rust",
  "C++", "C#", "PHP", "Ruby", "Swift", "Kotlin", "Dart", "Vue", "React",
];

const defaultFilters = {
  query: "",
  language: "all",
  sort: "stars",
  order: "desc",
  minStars: 0,
};

const SearchPage = () => {
  document.title = "Search | GitHub Explorer";

  const [filters, setFilters] = useState(defaultFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (filters.query.trim()) handleSearch();
      else setRepos([]);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filters.query, filters.language, filters.sort, filters.order, filters.minStars]);

  const handleInputChange = (field, value) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setRepos([]);

    let q = filters.query.trim();
    if (filters.language !== "all") q += ` language:${filters.language}`;
    if (filters.minStars > 0) q += ` stars:>=${filters.minStars}`;

    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=${filters.sort}&order=${filters.order}&per_page=20`
      );
      const data = await res.json();
      if (data.items) {
        setRepos(data.items);
        localStorage.setItem("searchedRepos", JSON.stringify(data.items));
      } else {
        setError("No results found.");
      }
    } catch {
      setError("Failed to fetch results.");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setRepos([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900/10 via-blue-900/10 to-gray-900/10 text-white">
      <Navbar onToggleBookmarks={() => setShowDrawer(true)} />
      <BookmarkDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} />

      <div className="flex-1 px-4 sm:px-6 md:px-10 w-full max-w-screen-xl mx-auto">
        {/* Search Box */}
        <Reveal delay={0.1}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 mt-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={filters.query}
                  onChange={(e) => handleInputChange("query", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition w-full md:w-auto justify-center"
              >
                <Filter className="w-5 h-5" /> Filters
              </button>

              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-white font-medium w-full md:w-auto"
              >
                Search
              </button>
            </div>

            {/* Advanced Filters */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showAdvanced ? "max-h-[1000px]" : "max-h-0"}`}>
              {showAdvanced && (
                <Reveal delay={0.2}>
                  <div className="space-y-4 pt-4 border-t border-gray-700/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Language Filter */}
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Language</label>
                        <select
                          value={filters.language}
                          onChange={(e) => handleInputChange("language", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                        >
                          {POPULAR_LANGUAGES.map((lang) => (
                            <option key={lang} value={lang}>
                              {lang === "all" ? "All Languages" : lang}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Sort */}
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Sort by</label>
                        <select
                          value={filters.sort}
                          onChange={(e) => handleInputChange("sort", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                        >
                          <option value="stars">Stars</option>
                          <option value="forks">Forks</option>
                          <option value="updated">Last Updated</option>
                          <option value="created">Created Date</option>
                        </select>
                      </div>

                      {/* Order */}
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Order</label>
                        <select
                          value={filters.order}
                          onChange={(e) => handleInputChange("order", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                        >
                          <option value="desc">Descending</option>
                          <option value="asc">Ascending</option>
                        </select>
                      </div>

                      {/* Min Stars */}
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Min Stars</label>
                        <input
                          type="number"
                          value={filters.minStars}
                          onChange={(e) => handleInputChange("minStars", parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center">
                      <button onClick={clearFilters} className="flex items-center gap-2 text-gray-400 hover:text-white">
                        <X className="w-4 h-4" /> Clear Filters
                      </button>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </Reveal>

        {/* Results Section */}
        {repos.length > 0 && (
          <Reveal delay={0.3}>
            <div className="mt-4 space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={() => navigate("/stats")}
                  className="inline-flex items-center gap-2 text-blue-500 font-semibold px-4 py-2 rounded-xl transition hover:text-blue-400"
                >
                  <ExternalLink className="w-4 h-5" /> View Stats
                </button>
              </div>

              <RepoCardGrid repos={repos} loading={loading} error={error} />
            </div>
          </Reveal>
        )}

        {/* Loading or Error */}
        {loading && (
          <div className="w-full flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        </div>
        )}
        {error && (
          <div className="text-center text-red-500 mt-6">{error}</div>
        )}
      </div>

      {/* Footer */}
      {repos.length > 0 && !loading && !error && (
          <Footer />
      )}
    </div>
  );
};

export default SearchPage;
