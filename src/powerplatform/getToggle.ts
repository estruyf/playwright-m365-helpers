import { FrameLocator, Locator } from "@playwright/test";
import { getControlByName } from "./getControlByName";

export const getToggle = (
  frame: FrameLocator | Locator,
  controlName: string
) => {
  return getControlByName(frame, controlName).locator(`.appmagic-toggleSwitch`);
};
