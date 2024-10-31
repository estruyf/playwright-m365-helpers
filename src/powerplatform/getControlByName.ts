import { FrameLocator, Locator } from "@playwright/test";

export const getControlByName = (
  frame: FrameLocator | Locator,
  controlName: string
): Locator => {
  return frame.locator(`div[data-control-name='${controlName}']`);
};
