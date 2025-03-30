import { Expedition } from "../types/Expedition";
import { Creature } from "../types/Creature";
import { Item } from "../types/Item";

const API_URL = "/api";

// Define the type for finishing an expedition
export interface FinishExpeditionResponse {
  expedition: Expedition;
  hunt: Record<string, number>;
  loot: Record<string, number>;
  creatures: Creature[];
  items: Item[];
  rounds: number;
}

// Helper to convert minutes to an ISO-8601 duration string.
const convertMinutesToISODuration = (minutes: number): string => {
  if (minutes % 60 === 0) {
    return `PT${minutes / 60}H`;
  } else {
    return `PT${minutes}M`;
  }
};

export const fetchExpeditions = async (): Promise<{
  expeditions: Expedition[];
  locations: any;
  creatures: any;
  items: any;
}> => {
  const response = await fetch(`${API_URL}/v1/expeditions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch expeditions.");
  }
  return response.json();
};

export const createExpedition = async (
  locationId: string,
  duration: number
): Promise<Expedition> => {
  const isoDuration = convertMinutesToISODuration(duration);
  const response = await fetch(`${API_URL}/v1/expeditions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ locationId, duration: isoDuration }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create expedition.");
  }
  return response.json();
};

export const finishExpedition = async (
  expeditionId: string
): Promise<FinishExpeditionResponse> => {
  const response = await fetch(`${API_URL}/v1/expeditions/${expeditionId}/finish`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to finish expedition.");
  }
  return response.json() as Promise<FinishExpeditionResponse>;
};
