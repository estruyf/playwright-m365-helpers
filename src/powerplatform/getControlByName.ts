import { FrameLocator, Locator } from "@playwright/test";

export const getControlByName = (
  frame: FrameLocator,
  controlName: string
): Locator => {
  return frame.locator(`div[data-control-name='${controlName}']`);
};
