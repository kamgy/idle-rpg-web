import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchExpeditions } from "../services/expeditionService";
import { Expedition } from "../types/Expedition";
import { Location } from "../types/Location";
import { Creature } from "../types/Creature";
import { Item } from "../types/Item";
import "./ExpeditionsPage.css";

export default function ExpeditionPage() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedExpeditionIds, setExpandedExpeditionIds] = useState<string[]>(
    []
  );

  useEffect(() => {
    async function getExpeditions() {
      try {
        const { expeditions, locations, creatures, items } =
          await fetchExpeditions();
        setExpeditions(expeditions);
        setLocations(locations);
        setCreatures(creatures);
        setItems(items);
      } catch (error) {
        console.error("Error fetching expeditions:", error);
      } finally {
        setLoading(false);
      }
    }
    getExpeditions();
  }, []);

  // Helpers to get names from IDs
  const getLocationName = (locationId: string) => {
    const location = locations.find((loc) => loc.id === locationId);
    return location ? location.name : "Unknown Location";
  };

  const getCreatureName = (creatureId: string) => {
    const creature = creatures.find((c) => c.id === creatureId);
    return creature ? creature.name : "Unknown Creature";
  };

  const getItemName = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    return item ? item.name : "Unknown Item";
  };

  // Toggle expanded state for an expedition
  const toggleExpedition = (id: string) => {
    setExpandedExpeditionIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {loading ? (
        <p>Loading expeditions...</p>
      ) : expeditions.length === 0 ? (
        <p>No active expeditions</p>
      ) : (
        // Wrap the list in a scrollable container
        <div className="expeditions-container">
          {/* Go back to Home button */}
          <div>
            <Link to="/home" className="back-button navigation-button">
              Go back to Home
            </Link>
          </div>
          <h1>Expeditions</h1>
          {expeditions.map((expedition) => {
            const isExpanded = expandedExpeditionIds.includes(expedition.id);
            return (
              <div
                key={expedition.id}
                className="expedition-card"
                onClick={() => toggleExpedition(expedition.id)}
              >
                <div className="expedition-header">
                  <h2 className="text-lg font-semibold">
                    Expedition to {getLocationName(expedition.locationId)}
                  </h2>
                  <span>{isExpanded ? "▲" : "▼"}</span>
                </div>
                <p className="expedition-summary">
                  Status: {expedition.status}
                </p>
                <p className="expedition-summary">
                  Start: {new Date(expedition.startAt).toLocaleString()}
                </p>
                <p className="expedition-summary">
                  Finish: {new Date(expedition.finishAt).toLocaleString()}
                </p>
                {isExpanded && (
                  <div className="expedition-details">
                    {Object.keys(expedition.hunt).length > 0 && (
                      <div>
                        <h3 className="font-semibold mt-2">
                          Hunted Creatures:
                        </h3>
                        <ul>
                          {Object.entries(expedition.hunt).map(
                            ([creatureId, count]) => (
                              <li key={creatureId}>
                                {getCreatureName(creatureId)} × {count}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                    {Object.keys(expedition.loot).length > 0 && (
                      <div>
                        <h3 className="font-semibold mt-2">Loot Acquired:</h3>
                        <ul>
                          {Object.entries(expedition.loot).map(
                            ([itemId, count]) => (
                              <li key={itemId}>
                                {getItemName(itemId)} × {count}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
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
}
