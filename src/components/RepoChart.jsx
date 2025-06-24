import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { BarChart3, ChartBar } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const RepoChart = ({ repositories }) => {
  const chartRef = useRef(null);

  const getLanguageDistribution = () => {
    const languageCounts = {};
    repositories.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    });

    const sortedLanguages = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);

    return {
      labels: sortedLanguages.map(([lang]) => lang),
      datasets: [
        {
          data: sortedLanguages.map(([, count]) => count),
          backgroundColor: [
            "#3B82F6",
            "#10B981",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
            "#F97316",
            "#06B6D4",
            "#84CC16",
          ],
          borderWidth: 0,
        },
      ],
    };
  };

  const getStarsDistribution = () => {
    const ranges = [
      { label: "0-100", min: 0, max: 100 },
      { label: "100-1K", min: 100, max: 1000 },
      { label: "1K-10K", min: 1000, max: 10000 },
      { label: "10K-100K", min: 10000, max: 100000 },
      { label: "100K+", min: 100000, max: Infinity },
    ];

    const counts = ranges.map(
      (range) =>
        repositories.filter(
          (repo) =>
            repo.stargazers_count >= range.min &&
            repo.stargazers_count < range.max
        ).length
    );

    return {
      labels: ranges.map((r) => r.label),
      datasets: [
        {
          label: "Repositories",
          data: counts,
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const getActivityTrend = () => {
    const months = [];
    const currentDate = new Date();

    for (let i = 11; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      months.push(
        date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
      );
    }

    const activityData = months.map((month) => {
      return repositories.filter((repo) => {
        const repoDate = new Date(repo.updated_at);
        const monthKey = repoDate.toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        });
        return monthKey === month;
      }).length;
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Repository Updates",
          data: activityData,
          borderColor: "rgba(16, 185, 129, 1)",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#D1D5DB",
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#F3F4F6",
        bodyColor: "#D1D5DB",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#D1D5DB" },
        grid: { color: "rgba(75, 85, 99, 0.3)" },
      },
      y: {
        ticks: { color: "#D1D5DB" },
        grid: { color: "rgba(75, 85, 99, 0.3)" },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#D1D5DB",
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#F3F4F6",
        bodyColor: "#D1D5DB",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
  };

  if (repositories.length === 0) {
    return (
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-4">Analytics</h2>
        <p className="text-gray-400">No data available for analysis</p>
      </div>
    );
  }

  const getIssuesDistribution = () => {
    const ranges = [
      { label: "0-50", min: 0, max: 50 },
      { label: "50-200", min: 50, max: 200 },
      { label: "200-500", min: 200, max: 500 },
      { label: "500-1K", min: 500, max: 1000 },
      { label: "1K+", min: 1000, max: Infinity },
    ];

    const counts = ranges.map(
      (range) =>
        repositories.filter(
          (repo) =>
            repo.open_issues_count >= range.min &&
            repo.open_issues_count < range.max
        ).length
    );

    return {
      labels: ranges.map((r) => r.label),
      datasets: [
        {
          label: "Repositories",
          data: counts,
          backgroundColor: "rgba(234, 88, 12, 0.6)",
          borderColor: "rgba(234, 88, 12, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const getContributionsDistribution = () => {
    const contributionCounts = repositories.map((repo) => ({
      name: repo.name,
      contributions: repo.watchers_count || 0,
    }));

    // Sort top 10 by watchers (as contribution proxy)
    const topContributions = contributionCounts
      .sort((a, b) => b.contributions - a.contributions)
      .slice(0, 10);

    return {
      labels: topContributions.map((repo) => repo.name),
      datasets: [
        {
          label: "Contributions (Proxy via Watchers)",
          data: topContributions.map((repo) => repo.contributions),
          backgroundColor: "rgba(139, 92, 246, 0.6)",
          borderColor: "rgba(139, 92, 246, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-1">
        <BarChart3 className="w-8 h-8 text-[#d2a8ff]" /> Repository Analytics
      </h2>
      <p className="mb-4 text-sm text-gray-400 text-center">
        Showing stats for{" "}
        {localStorage.getItem("searchedRepos")
          ? "your last search"
          : "top trending repositories"}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-medium text-white mb-4">
            Language Distribution
          </h3>
          <div className="h-64">
            <Doughnut
              data={getLanguageDistribution()}
              options={doughnutOptions}
            />
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-medium text-white mb-4">
            Stars Distribution
          </h3>
          <div className="h-64">
            <Bar data={getStarsDistribution()} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-medium text-white mb-4">
          Activity Trend (Last 12 Months)
        </h3>
        <div className="h-64">
          <Line data={getActivityTrend()} options={chartOptions} />
        </div>
      </div>

      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-medium text-white mb-4">
          Issues Distribution
        </h3>
        <div className="h-64">
          <Bar data={getIssuesDistribution()} options={chartOptions} />
        </div>
      </div>

      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-medium text-white mb-4">
          Contributions Distribution
        </h3>
        <div className="h-64">
          <Bar data={getContributionsDistribution()} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default RepoChart;
