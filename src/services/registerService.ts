const API_URL = "/api"; // Base URL for the API

// Define types for payload and response
interface RegisterPayload {
  email: string;
  password: string;
  nickName: string;
}

interface RegisterResponse {
  message: string; // Assuming the backend returns a success message
}

export const register = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_URL}/v1/accounts/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
