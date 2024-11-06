import { Page } from "@playwright/test";
import { Logger } from "../utils/Logger";

/**
 * Mocks a connector by intercepting HTTP requests and fulfilling them with the provided data.
 *
 * @param page - The Playwright Page object.
 * @param connectorId - The ID of the connector to mock.
 * @param method - The HTTP method to mock. By default, it will mock a GET request.
 * @param status - The status code to return in the mocked response. By default, it will return 200.
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
  method: string = "GET",
  status: number = 200,
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
      const apiMethod = route.request().method();
      if (apiMethod !== "POST") {
        return route.continue();
      }

      const headers = route.request().headers();
      const requestUrl = headers["x-ms-request-url"];
      const requestMethod = headers["x-ms-request-method"];

      if (logging) {
        Logger(
          `mockConnector: Checking connector ID in request URL...`,
          requestUrl,
          requestMethod
        );
      }

      if (!requestUrl || !requestUrl.includes(connectorId)) {
        return route.continue();
      }

      if (!requestMethod || requestMethod !== method) {
        return route.continue();
      }

      if (logging) {
        Logger(
          `mockConnector: Mocking response for (${requestMethod}) ${connectorId}...`
        );
      }

      route.fulfill({
        status: status,
        contentType: "application/json",
        body: JSON.stringify(data),
      });
    },
    options
  );
};
