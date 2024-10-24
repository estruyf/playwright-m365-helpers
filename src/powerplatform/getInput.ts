import { FrameLocator } from "@playwright/test";
import { getControlByName } from "./getControlByName";

export const getInput = (frame: FrameLocator, controlName: string) => {
  return getControlByName(frame, controlName).locator(`input`);
};
