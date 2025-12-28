import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<News key="general" country="in" category="general" pageSize={6} />}
        />

        <Route
          path="/business"
          element={<News key="business" country="in" category="business" pageSize={6} />}
        />

        <Route
          path="/entertainment"
          element={<News key="entertainment" country="in" category="entertainment" pageSize={6} />}
        />

        <Route
          path="/health"
          element={<News key="health" country="in" category="health" pageSize={6} />}
        />

        <Route
          path="/science"
          element={<News key="science" country="in" category="science" pageSize={6} />}
        />

        <Route
          path="/sports"
          element={<News key="sports" country="in" category="sports" pageSize={6} />}
        />

        <Route
          path="/technology"
          element={<News key="technology" country="in" category="technology" pageSize={6} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
