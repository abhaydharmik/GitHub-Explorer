import React from "react";
import RepoCard from "./RepoCard";

const RepoCardGrid = ({ repos, loading, error }) => {
  return (
    <div className="scroll-smooth px-0 py-6">
      {loading && repos.length === 0 ? (
        <div className="w-full flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="transition-opacity duration-500 ease-in-out opacity-0 animate-fade-in"
              >
                <RepoCard repo={repo} />
              </div>
            ))}
          </div>

          {/* Loading spinner for infinite scroll fetch */}
          {loading && repos.length > 0 && (
            <div className="mt-10 flex justify-center items-center h-16">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-400 border-t-transparent"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RepoCardGrid;
