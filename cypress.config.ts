import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    env: {
      api: "http://localhost:5050/api"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: false
  },
});
