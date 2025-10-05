export default {
  reporter: [["html", { outputFolder: "html-report", open: "never" }]],
  use: { headless: true, screenshot: "on", video: "retain-on-failure" },
};
