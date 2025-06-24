import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Trending from "./pages/Trending";
import SearchPage from "./pages/SearchPage";
import BookmarksPage from "./pages/BookmarksPage";
import StatsPage from "./pages/StatsPage";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Toaster } from "react-hot-toast";

// Configure NProgress without spinner
NProgress.configure({ showSpinner: false });

// Separate wrapper to listen for location change and show progress
const LoadingBarWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      {/* Global Toasts */}
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      {/* NProgress + Routing */}
      <LoadingBarWrapper />
    </Router>
  );
};

export default App;
