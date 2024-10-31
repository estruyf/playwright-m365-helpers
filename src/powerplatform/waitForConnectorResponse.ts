import { Page } from "@playwright/test";
import { Logger } from "../utils/Logger";

/**
 * Waits for a response from a connector with the specified connector ID.
 *
 * @param page - The Playwright Page object to interact with.
 * @param connectorId - The ID of the connector to wait for a response from.
 * @param options - Optional settings for waiting for the response.
 * @param options.logging - Whether to log the waiting process.
 * @param options.timeout - The maximum time to wait for the response, in milliseconds.
 * @returns A promise that resolves when the response is received.
 */
export const waitForConnectorResponse = async (
  page: Page,
  connectorId: string,
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

    if (logging) {
      Logger(
        `waitForConnectorResponse: Checking connector ID in request URL...`,
        requestUrl
      );
    }

    if (!requestUrl || !requestUrl.includes(connectorId)) {
      return false;
    }

    if (logging) {
      Logger(`waitForConnectorResponse: Response from ${connectorId} found!`);
    }

    return true;
  }, options);
};
