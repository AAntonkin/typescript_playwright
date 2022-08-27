import { LaunchOptions } from "@playwright/test";
const browserOptions: LaunchOptions = {
  slowMo: 0,
  args: [
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
  ],
};

export const config = {
  browser: process.env.BROWSER || "chromium",
  browserOptions,
  BASE_URL: "https://automationteststore.com/",
  IMG_THRESHOLD: { threshold: 0.4 },
  BASE_API_URL: "http://localhost:54356/",
};
