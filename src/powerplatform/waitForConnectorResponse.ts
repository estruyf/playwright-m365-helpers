import { Page } from "@playwright/test";
import { Logger } from "../utils/Logger";

/**
 * Waits for a response from a connector with the specified connector ID.
 *
 * @param page - The Playwright Page object to interact with.
 * @param connectorId - The ID of the connector to wait for a response from.
 * @param method - The HTTP method to wait for. By default, it will wait for a GET request.
 * @param options - Optional settings for waiting for the response.
 * @param options.logging - Whether to log the waiting process.
 * @param options.timeout - The maximum time to wait for the response, in milliseconds.
 * @returns A promise that resolves when the response is received.
 */
export const waitForConnectorResponse = async (
  page: Page,
  connectorId: string,
  method: string = "GET",
  options?: {
    logging?: boolean;
    timeout?: number;
  }
) => {
  const logging = options?.logging ?? false;
  delete options?.logging;

  return await page.waitForResponse((response) => {
    const url = response.url();

    if (!url.endsWith("/invoke")) {
      return false;
    }

    const headers = response.request().headers();
    const requestUrl = headers["x-ms-request-url"];
    const requestMethod = headers["x-ms-request-method"];

    if (logging) {
      Logger(
        `waitForConnectorResponse: Checking connector ID in request URL...`,
        requestUrl,
        requestMethod
      );
    }

    if (!requestUrl || !requestUrl.includes(connectorId)) {
      return false;
    }

    if (!requestMethod || requestMethod !== method) {
      return false;
    }

    if (logging) {
      Logger(
        `waitForConnectorResponse: Response from  (${requestMethod}) ${connectorId} found!`
      );
    }

    return true;
  }, options);
};
