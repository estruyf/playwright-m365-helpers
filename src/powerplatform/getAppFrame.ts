import { expect, FrameLocator, Page } from "@playwright/test";

export const getAppFrame = async (page: Page): Promise<FrameLocator> => {
  const iframe = page.frameLocator("iframe#fullscreen-app-host");
  const publishedCanvas = iframe.locator("#publishedCanvas");
  await expect(publishedCanvas).toBeVisible();
  return iframe;
};
