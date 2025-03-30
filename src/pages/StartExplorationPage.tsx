import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createExpedition } from "../services/expeditionService";
import {
  fetchLocations,
  LocationsResponse,
} from "../services/locationsService";
import { Location } from "../types/Location";
import "./StartExplorationPage.css";

const StartExplorationPage: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const [duration, setDuration] = useState<number>(5);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState<string>("");

  useEffect(() => {
    if (locationId) {
      // Fetch locations to find the name for the given id.
      fetchLocations()
        .then((data: LocationsResponse) => {
          const loc: Location | undefined = data.locations.find(
            (l) => l.id === locationId
          );
          setLocationName(loc ? loc.name : "Unknown Location");
        })
        .catch((err) => {
          console.error("Error fetching location data:", err);
          setLocationName("Unknown Location");
        });
    }
  }, [locationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createExpedition(locationId!, duration);
      setSuccess(true);
      // Redirect to /home after a short delay
      setTimeout(() => navigate("/home"), 1500);
    } catch (err: any) {
      setError(err.message || "Failed to create expedition.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="start-exploration-page">
      {/* Back button now uses the same navigation-button class */}
      <Link to="/locations" className="navigation-button">
        Back to Locations
      </Link>
      <h1>Start Exploring</h1>
      <p>Location: {locationName || locationId}</p>
      <form onSubmit={handleSubmit} className="exploration-form">
        <label htmlFor="duration">Duration (minutes):</label>
        <input
          type="number"
          id="duration"
          min="1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Expedition started!</p>}
        <button type="submit" className="navigation-button">
          {loading ? "Starting..." : "Start Expedition"}
        </button>
      </form>
    </div>
  );
};

export default StartExplorationPage;
