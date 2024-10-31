import { FrameLocator, Locator } from "@playwright/test";

export const getControlPart = (
  frame: FrameLocator | Locator,
  controlPartName: string
): Locator => {
  return frame.locator(`div[data-control-part='${controlPartName}']`);
};
