import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButton from "../components/NavigationButton";
import UserInfo from "../components/UserInfo";
import {
  fetchExpeditions,
  finishExpedition,
  FinishExpeditionResponse,
} from "../services/expeditionService";
import { Expedition, ExpeditionStatus } from "../types/Expedition";
import { fetchUser } from "../services/homeService";
import { User } from "../types/User";
import { Location } from "../types/Location";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeExpedition, setActiveExpedition] = useState<Expedition | null>(
    null
  );
  const [readyExpedition, setReadyExpedition] = useState<Expedition | null>(
    null
  );
  const [locations, setLocations] = useState<Location[]>([]);
  const [finishResult, setFinishResult] =
    useState<FinishExpeditionResponse | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, expeditionResponse] = await Promise.all([
          fetchUser(),
          fetchExpeditions(),
        ]);
        setUser(userData);
        // expeditionResponse contains expeditions and locations (among others)
        setActiveExpedition(
          expeditionResponse.expeditions.find(
            (exp) => exp.status === ExpeditionStatus.Active
          ) || null
        );
        setReadyExpedition(
          expeditionResponse.expeditions.find(
            (exp) => exp.status === ExpeditionStatus.ReadyToFinish
          ) || null
        );
        setLocations(expeditionResponse.locations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Update timer for active expedition
  useEffect(() => {
    if (activeExpedition) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const finishTime = new Date(activeExpedition.finishAt).getTime();
        const diff = finishTime - now;
        setTimeLeft(diff > 0 ? diff : 0);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeExpedition]);

  // Helper: format time as hh:mm:ss if needed, otherwise mm:ss
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Helper: get location name from id
  const getLocationName = (locationId: string): string => {
    const loc = locations.find((l) => l.id === locationId);
    return loc ? loc.name : "Unknown Location";
  };

  const handleFinishActiveExpedition = async () => {
    if (!activeExpedition) return;
    setError(null);
    try {
      const result = await finishExpedition(activeExpedition.id);
      setFinishResult(result);
      setActiveExpedition(null);
    } catch (err: any) {
      console.error("Error finishing expedition:", err);
      setError(err.message);
    }
  };

  const handleFinishReadyExpedition = async () => {
    if (!readyExpedition) return;
    setError(null);
    try {
      const result = await finishExpedition(readyExpedition.id);
      setFinishResult(result);
      setReadyExpedition(null);
    } catch (err: any) {
      console.error("Error finishing expedition:", err);
      setError(err.message);
    }
  };

  const handleCloseSummary = () => {
    setFinishResult(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <main className="home-page">
      <h1>Welcome Back, Hero!</h1>
      {user && <UserInfo user={user} />}

      {activeExpedition && (
        <div className="expedition-info">
          <p className="expedition-status">
            Active Expedition to {getLocationName(activeExpedition.locationId)}
          </p>
          <p className="expedition-timer">Time Left: {formatTime(timeLeft)}</p>
          <NavigationButton
            label="Finish Early"
            onClick={handleFinishActiveExpedition}
          />
        </div>
      )}

      {readyExpedition && (
        <div className="expedition-info">
          <NavigationButton
            label="Finish Expedition"
            onClick={handleFinishReadyExpedition}
          />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {finishResult && (
        <div className="expedition-summary-card">
          <div className="summary-header">
            <h2>Expedition Summary</h2>
            <button className="close-summary" onClick={handleCloseSummary}>
              &times;
            </button>
          </div>
          <p>
            <strong>Rounds:</strong> {finishResult.rounds}
          </p>
          <div className="summary-section">
            <h3>Hunted Creatures</h3>
            {Object.keys(finishResult.hunt).length === 0 ? (
              <p>No creatures hunted.</p>
            ) : (
              <ul>
                {Object.entries(finishResult.hunt).map(
                  ([creatureId, count]) => (
                    <li key={creatureId}>
                      {finishResult.creatures.find((c) => c.id === creatureId)
                        ?.name || "Unknown Creature"}
                      : {count}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
          <div className="summary-section">
            <h3>Loot Acquired</h3>
            {Object.keys(finishResult.loot).length === 0 ? (
              <p>No loot acquired.</p>
            ) : (
              <ul>
                {Object.entries(finishResult.loot).map(([itemId, count]) => (
                  <li key={itemId}>
                    {finishResult.items.find((i) => i.id === itemId)?.name ||
                      "Unknown Item"}
                    : {count}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <NavigationButton
            label="Close Summary"
            onClick={handleCloseSummary}
          />
        </div>
      )}

      <NavigationButton
        label="Expeditions"
        onClick={() => navigate("/expeditions")}
      />
      <NavigationButton
        label="Locations"
        onClick={() => navigate("/locations")}
      />
      <NavigationButton label="Logout" onClick={handleLogout} />
    </main>
  );
};

export default HomePage;
