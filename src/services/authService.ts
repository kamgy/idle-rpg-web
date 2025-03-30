const API_URL = "/api"; // No need to use the full backend URL

// Define types for payload and response
interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

interface RefreshPayload {
  refreshToken: string;
}

export const refreshLogin = async (
  payload: RefreshPayload
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/v1/auth/login/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Refresh login failed");
    }
    return response.json();
  } catch (error) {
    console.error("Refresh login error:", error);
    throw error;
  }
};
