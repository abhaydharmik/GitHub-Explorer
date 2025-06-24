import React, { useEffect, useState } from "react";
import RepoChart from "../components/RepoChart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookmarkDrawer from "../components/BookmarkDrawer";
import Reveal from "../components/Reveal";

const StatsPage = () => {
  document.title = "Stats | GitHub Explorer";

  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("searchedRepos");
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=20"
        );
        const data = await res.json();
        setRepositories(data.items || []);
      } catch {
        setError("Failed to fetch trending repository stats.");
      } finally {
        setLoading(false);
      }
    };

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRepositories(parsed);
      } catch {
        fetchData();
      } finally {
        setLoading(false);
      }
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/10 via-blue-900/10 to-gray-900/10 text-white">
      {/* Navbar & Bookmark Drawer */}
      <Navbar onToggleBookmarks={() => setShowDrawer(true)} />
      <BookmarkDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} />

      {/* Main */}
      <main className="w-full px-4 sm:px-6 md:px-10 pt-8 pb-16">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <Reveal delay={0.2}>
            <p className="text-center text-red-500 text-lg">{error}</p>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <>
              <RepoChart repositories={repositories} />
            </>
          </Reveal>
        )}
      </main>

      {/* Footer */}
      {!loading && !error && repositories.length > 0 && <Footer />}
    </div>
  );
};

export default StatsPage;
