import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Search,
  BarChart3,
  Bookmark,
  Telescope,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookmarkDrawer from "../components/BookmarkDrawer";
import Reveal from "../components/Reveal";

const HomePage = () => {
  document.title = "GitHub Explorer";

  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowDrawer(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117] text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-blue-900/10 to-gray-900/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gray-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar onToggleBookmarks={() => setShowDrawer(!showDrawer)} />
        </div>

        {/* Drawer */}
        <BookmarkDrawer
          isOpen={showDrawer}
          onClose={() => setShowDrawer(false)}
        />

        {/* Hero Section */}
        <section className="w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Discover Top Open Source Repositories
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
              GitHub Explorer helps you find trending repositories, analyze
              project stats, and keep track of your favorites — all in one
              place.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <Link
              to="/trending"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white text-base sm:text-lg font-semibold rounded-md shadow-md transition-all duration-200 hover:bg-blue-700 hover:scale-105"
            >
              <Telescope className="w-5 h-5" />
              Explore Trending Repos
            </Link>
          </Reveal>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <Reveal>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-16">
                GitHub Explorer in Numbers
              </h3>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
              <Reveal delay={0}>
                <div className="stat-card">
                  <h4 className="text-4xl font-bold text-[#58a6ff]">12k+</h4>
                  <p className="text-sm text-gray-400 mt-1">Repositories</p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="stat-card">
                  <h4 className="text-4xl font-bold text-[#2ea043]">5k+</h4>
                  <p className="text-sm text-gray-400 mt-1">Contributors</p>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="stat-card">
                  <h4 className="text-4xl font-bold text-[#f2cc60]">900+</h4>
                  <p className="text-sm text-gray-400 mt-1">Languages</p>
                </div>
              </Reveal>
              <Reveal delay={0.6}>
                <div className="stat-card">
                  <h4 className="text-4xl font-bold text-[#d2a8ff]">15k+</h4>
                  <p className="text-sm text-gray-400 mt-1">Stars Tracked</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-white">
                Features You’ll Love
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Reveal delay={0}>
                <div className="feature-card">
                  <TrendingUp className="mx-auto w-10 h-10 text-[#2ea043] mb-4" />
                  <h3 className="font-bold text-xl mb-2">Trending</h3>
                  <p className="text-sm text-gray-400">
                    Explore popular repositories daily to stay up-to-date with
                    the dev world.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="feature-card">
                  <Search className="mx-auto w-10 h-10 text-[#58a6ff] mb-4" />
                  <h3 className="font-bold text-xl mb-2">Smart Search</h3>
                  <p className="text-sm text-gray-400">
                    Filter by language, stars, or name and find exactly what you
                    need.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="feature-card">
                  <BarChart3 className="mx-auto w-10 h-10 text-[#d2a8ff] mb-4" />
                  <h3 className="font-bold text-xl mb-2">Repo Stats</h3>
                  <p className="text-sm text-gray-400">
                    Get visual insights with interactive charts and graphs.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.6}>
                <div className="feature-card">
                  <Bookmark className="mx-auto w-10 h-10 text-[#f2cc60] mb-4" />
                  <h3 className="font-bold text-xl mb-2">Bookmarks</h3>
                  <p className="text-sm text-gray-400">
                    Save and revisit your favorite repositories with ease.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 text-center">
          <Reveal delay={0.2}>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Ready to Explore the World of Open Source?
            </h3>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-base sm:text-lg">
              Jump in and discover your next favorite repository now.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-md font-semibold shadow-md transition-all duration-200 hover:bg-blue-700 hover:scale-105"
            >
              <Search className="w-5 h-5" />
              Start Searching
            </Link>
          </Reveal>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
