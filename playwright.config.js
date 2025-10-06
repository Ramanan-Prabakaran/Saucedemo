export default {
  reporter: [["html", { outputFolder: "html-report", open: "never" }]],
  use: {
    headless: false, // Show browser for demo recording
    screenshot: "on",
    video: "on", // Record every test (not just failures)
    trace: "retain-on-failure", // Optional - helps debug or showcase
  },
};
