import { FrameLocator } from "@playwright/test";
import { getControlByName } from "./getControlByName";

export const getToggle = (frame: FrameLocator, controlName: string) => {
  return getControlByName(frame, controlName).locator(`.appmagic-toggleSwitch`);
};
