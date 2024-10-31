import { Page } from "@playwright/test";
import { Logger } from "../utils/Logger";

/**
 * Waits for a request to a connector with the specified connector ID.
 *
 * @param page - The Playwright Page object to interact with.
 * @param connectorId - The ID of the connector to wait for a response from.
 * @param options - Optional settings for waiting for the response.
 * @param options.logging - Whether to log the waiting process.
 * @param options.timeout - The maximum time to wait for the response, in milliseconds.
 * @returns A promise that resolves when the response is received.
 */
export const waitForConnectorRequest = async (
  page: Page,
  connectorId: string,
  options?: {
    logging?: boolean;
    timeout?: number;
  }
) => {
  const logging = options?.logging ?? false;
  delete options?.logging;

  return await page.waitForRequest((request) => {
    const url = request.url();

    if (logging) {
      Logger(
        `waitForConnectorRequest: Waiting for request to ${connectorId}...`
      );
    }

    if (!url.endsWith("/invoke")) {
      return false;
    }

    const headers = request.headers();
    const requestUrl = headers["x-ms-request-url"];

    if (logging) {
      Logger(
        `waitForConnectorRequest: Checking connector ID in request URL...`,
        requestUrl
      );
    }

    if (!requestUrl || !requestUrl.includes(connectorId)) {
      return false;
    }

    if (logging) {
      Logger(`waitForConnectorRequest: Request to ${connectorId} found!`);
    }

    return true;
  }, options);
};
