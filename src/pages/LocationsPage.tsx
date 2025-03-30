import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchLocations,
  LocationsResponse,
} from "../services/locationsService";
import { Location } from "../types/Location";
import { Creature } from "../types/Creature";
import { Item } from "../types/Item";
import { Link } from "react-router-dom";
import "./LocationsPage.css";

const LocationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>([]);
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [expandedLocationIds, setExpandedLocationIds] = useState<string[]>([]);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const data: LocationsResponse = await fetchLocations();
        setLocations(data.locations);
        setCreatures(data.creatures);
        setItems(data.items);
      } catch (err: any) {
        console.error("Error fetching locations:", err);
        setError("Failed to load locations.");
      } finally {
        setLoading(false);
      }
    };

    getLocations();
  }, []);

  const toggleExpand = (locationId: string) => {
    setExpandedLocationIds((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleStartExploration = (locationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to /locations/{id} (StartExplorationPage will be rendered)
    navigate(`/locations/${locationId}`);
  };

  const formatProbability = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <div className="locations-page">
      <div>
        <Link to="/home" className="back-button navigation-button">
          Go back to Home
        </Link>
      </div>
      <h1>Locations</h1>
      {loading ? (
        <p>Loading locations...</p>
      ) : error ? (
        <p>{error}</p>
      ) : locations.length === 0 ? (
        <p>No locations available.</p>
      ) : (
        <div className="locations-list">
          {locations.map((location) => {
            const isExpanded = expandedLocationIds.includes(location.id);
            return (
              <div
                key={location.id}
                className="location-card"
                onClick={() => toggleExpand(location.id)}
              >
                <div className="location-header">
                  <div className="location-info">
                    <h2>{location.name}</h2>
                    <p>Level: {location.level}</p>
                  </div>
                  <button
                    className="start-button navigation-button"
                    onClick={(e) => handleStartExploration(location.id, e)}
                  >
                    Start
                  </button>
                </div>
                {isExpanded && (
                  <div className="location-details">
                    <h3>Creatures</h3>
                    {Object.entries(location.creatures).length === 0 ? (
                      <p>No creatures available.</p>
                    ) : (
                      Object.entries(location.creatures).map(
                        ([creatureId, encounterRate]) => {
                          const creature = creatures.find(
                            (c) => c.id === creatureId
                          );
                          return (
                            <div key={creatureId} className="creature-info">
                              <strong>
                                {creature ? creature.name : "Unknown Creature"}
                              </strong>{" "}
                              - Encounter Rate:{" "}
                              {formatProbability(encounterRate)}
                              {creature &&
                                creature.loot &&
                                Object.keys(creature.loot).length > 0 && (
                                  <div className="creature-loot">
                                    <em>Loot:</em>
                                    <ul>
                                      {Object.entries(creature.loot).map(
                                        ([itemId, dropRate]) => {
                                          const item = items.find(
                                            (i) => i.id === itemId
                                          );
                                          return (
                                            <li key={itemId}>
                                              {item
                                                ? item.name
                                                : "Unknown Item"}{" "}
                                              - Drop Rate:{" "}
                                              {formatProbability(dropRate)}
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  </div>
                                )}
                            </div>
                          );
                        }
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LocationsPage;
