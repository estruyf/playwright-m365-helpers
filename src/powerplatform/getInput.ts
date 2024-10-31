import { FrameLocator, Locator } from "@playwright/test";
import { getControlByName } from "./getControlByName";

export const getInput = (
  frame: FrameLocator | Locator,
  controlName: string
) => {
  return getControlByName(frame, controlName).locator(`input`);
};
