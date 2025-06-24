import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BookmarkProvider } from "./context/BookmarkContext"; // 👈

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BookmarkProvider>
      <App />
    </BookmarkProvider>
  </React.StrictMode>
);
