import { Location } from "../types/Location";
import { Creature } from "../types/Creature";
import { Item } from "../types/Item";

export interface LocationsResponse {
  locations: Location[];
  creatures: Creature[];
  items: Item[];
}

const API_URL = "/api";

export const fetchLocations = async (): Promise<LocationsResponse> => {
  const response = await fetch(`${API_URL}/v1/locations`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch locations.");
  }

  return response.json() as Promise<LocationsResponse>;
};
