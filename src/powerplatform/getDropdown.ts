import { FrameLocator, Locator } from "@playwright/test";
import { getControlByName } from "./getControlByName";

export const getDropdown = (
  frame: FrameLocator | Locator,
  controlName: string
) => {
  return getControlByName(frame, controlName).locator(
    `div.drop-target[data-bind]:not(:empty)`
  );
};
