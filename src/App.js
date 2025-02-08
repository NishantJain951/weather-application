import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CityWeather from "./pages/CityWeather";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<CityWeather />} />
        <Route path="/" element={<CityWeather />} />
        <Route path="/weather/:city" element={<CityWeather />} />
      </Routes>
    </Router>
  );
};

export default App;
