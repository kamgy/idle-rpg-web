import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ExpeditionsPage from "./pages/ExpeditionsPage";
import LocationsPage from "./pages/LocationsPage";
import StartExplorationPage from "./pages/StartExplorationPage";

const App: React.FC = () => {
  useEffect(() => {
    const handleResize = () => {
      const wrapper = document.querySelector(".wrapper") as HTMLElement;
      if (wrapper) {
        wrapper.style.height = `${window.innerHeight}px`; // Dynamically set height
      }
    };

    // Initial height adjustment
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/expeditions" element={<ExpeditionsPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route
            path="/locations/:locationId"
            element={<StartExplorationPage />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
