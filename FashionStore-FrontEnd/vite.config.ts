/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default {
  server: {
    host: "0.0.0.0",
    //   port: 3000,

    // config alias
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),

      "@api": path.resolve(__dirname, "src/service/API"),
      "@models": path.resolve(__dirname, "src/models"),
    },
  },
};
