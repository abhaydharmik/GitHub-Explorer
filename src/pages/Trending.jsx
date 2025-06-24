import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import RepoCardGrid from "../components/RepoCardGrid";
import Footer from "../components/Footer";
import BookmarkDrawer from "../components/BookmarkDrawer";
import { ArrowUp, TrendingUp } from "lucide-react";
import Reveal from "../components/Reveal"; // 🔸 Import Reveal

const Trending = () => {
  document.title = "Trending | GitHub Explorer";

  const [repos, setRepos] = useState([]);
  const [query, setQuery] = useState("stars:>10000");
  const [sort, setSort] = useState("stars");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setRepos([]);
    setPage(1);
    setHasMore(true);
  }, [query, sort]);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://api.github.com/search/repositories?q=${encodeURIComponent(
            query
          )}&sort=${sort}&order=desc&per_page=25&page=${page}`
        );
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          setRepos((prev) => {
            const newRepos = data.items.filter(
              (repo) => !prev.some((r) => r.id === repo.id)
            );
            return [...prev, ...newRepos];
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setError("Failed to fetch repositories.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [page, sort, query]);

  useEffect(() => {
    let debounce;
    const handleScroll = () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const scrollY = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;

        if (clientHeight + scrollY + 100 >= scrollHeight && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }

        setShowScrollTop(scrollY > 150);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(debounce);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900/10 via-blue-900/10 to-gray-900/10 text-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar onToggleBookmarks={() => setShowDrawer(true)} />
      </div>

      {/* Drawer */}
      <BookmarkDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} />

      {/* Main */}
      <main className="flex-grow px-4 md:px-6 w-full mx-auto space-y-8 pb-10">
        <section className="mt-4 p-4">
          <Reveal delay={0}>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
              <h2 className="text-2xl flex gap-3 items-center font-bold">
                <TrendingUp className="w-8 h-8 text-green-500" />
                Trending Repositories
              </h2>
              <Filters currentSort={sort} setSort={setSort} />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <RepoCardGrid repos={repos} loading={loading} error={error} />
          </Reveal>

          {loading && (
            <div className="text-center text-gray-400 py-4">
              Loading repositories...
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-3 p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Trending;
