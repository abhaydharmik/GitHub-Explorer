# 🌐 GitHub Explorer

A modern web application to discover, filter, and analyze trending open-source repositories on GitHub. Built with React and the GitHub API, it offers real-time search, charts, bookmarking, notes.

**Live Demo:** 

🔗 [https://github-explorer-theta-ten.vercel.app/](https://github-explorer-gold-six.vercel.app/)

## Features

- 🔍 Real-time search for repositories  
- 🧠 Filter by language  
- 📊 Stats charts: stars, forks, issues  
- 📌 Bookmark repositories with 📝 personal notes  
- ♾️ Infinite scroll for trending repos  
- ✨ Smooth animations with Framer Motion  
- 🔔 Toast notifications and top progress bar  


## 🛠 Tech Stack & Packages

| Category             | Tool / Library                         | Purpose                                                 |
|----------------------|----------------------------------------|---------------------------------------------------------|
| **Framework**        | React (Vite)                           | Fast development and SPA routing                        |
| **Styling**          | Tailwind CSS, tailwindcss-line-clamp   | Responsive design and text truncation                   |
|                      | PostCSS, Autoprefixer                  | CSS processing                                          |
| **Routing**          | react-router-dom                       | Page navigation                                         |
| **API**              | Axios                                  | GitHub REST API integration                             |
| **Charts**           | Chart.js + react-chartjs-2             | Data visualization (stars, forks, issues)               |
| **Animations**       | Framer Motion                          | UI transitions and drawer effects                       |
| **Scroll Detection** | react-intersection-observer            | Infinite scroll                                         |
| **Icons**            | Lucide-react, React-icons              | Modern icons                                            |
| **Toasts**           | react-hot-toast                        | User notifications                                      |
| **Progress Bar**     | NProgress                              | Loading indication                                      |
| **Date Utility**     | date-fns                               | Date formatting                                         |


## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/abhaydharmik/GitHub-Explorer.git
cd github-explorer
```

### 2. Clone the Repository

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

## 📦 Manual Package Installation (If Needed)

```bash
npm install react react-dom react-router-dom vite \
tailwindcss postcss autoprefixer tailwindcss-line-clamp \
axios chart.js react-chartjs-2 \
react-icons lucide-react \
framer-motion react-hot-toast \
nprogress date-fns \
react-intersection-observer
```
