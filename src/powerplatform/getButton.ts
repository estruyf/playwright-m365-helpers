import { FrameLocator } from "@playwright/test";
import { getControlByName } from "./getControlByName";

export const getButton = (frame: FrameLocator, controlName: string) => {
  return getControlByName(frame, controlName).locator(`button`);
};
