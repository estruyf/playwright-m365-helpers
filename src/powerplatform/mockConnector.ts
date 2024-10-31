import { Page } from "@playwright/test";
import { Logger } from "../utils/Logger";

/**
 * Mocks a connector by intercepting HTTP requests and fulfilling them with the provided data.
 *
 * @param page - The Playwright Page object.
 * @param connectorId - The ID of the connector to mock.
 * @param data - The data to return in the mocked response.
 * @param options - Optional settings for the route.
 * @param options.times - How often the route should be used. By default, it will be used every time.
 *
 * @returns A promise that resolves when the route is set up.
 */
export const mockConnector = async (
  page: Page,
  connectorId: string,
  data: any,
  options?: {
    logging?: boolean;
    /**
     * How often a route should be used. By default it will be used every time.
     */
    times?: number;
  }
) => {
  const logging = options?.logging ?? false;
  delete options?.logging;

  return await page.route(
    "**/invoke",
    async (route) => {
      const method = route.request().method();
      if (method !== "POST") {
        return route.continue();
      }

      const headers = route.request().headers();
      const requestUrl = headers["x-ms-request-url"];

      if (logging) {
        Logger(
          `mockConnector: Checking connector ID in request URL...`,
          requestUrl
        );
      }

      if (!requestUrl || !requestUrl.includes(connectorId)) {
        return route.continue();
      }

      if (logging) {
        Logger(`mockConnector: Mocking response for ${connectorId}...`);
      }

      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(data),
      });
    },
    options
  );
};
