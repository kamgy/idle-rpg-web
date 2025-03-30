import { Expedition } from "../types/Expedition";
import { User } from "../types/User";

const API_URL = "/api";

export const fetchExpeditions = async (): Promise<Expedition[]> => {
  const response = await fetch(`${API_URL}/v1/expeditions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch expeditions.");
  }

  const data = await response.json();
  return data.expeditions as Expedition[];
};

export const fetchUser = async (): Promise<User> => {
  const response = await fetch(`${API_URL}/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data.");
  }

  const data = await response.json();
  return data as User;
};
