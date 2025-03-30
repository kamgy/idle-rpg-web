import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    base: "/",
    plugins: [react()],
    server: {
      port: 8081, // Frontend port
      strictPort: true,
      host: true,
      proxy: {
        // Forward `/api` requests to the backend
        "/api": {
          target: "http://localhost:8080", // Backend server
          changeOrigin: true, // Changes the origin to match the target
          secure: false, // If using HTTPS in dev with self-signed certs
          // No rewrite: backend expects `/api/v1/auth/login`
        },
      },
    },
  };
});
