import { FrameLocator, Locator } from "@playwright/test";
import { getControlByName } from "./getControlByName";

export const getLabel = (
  frame: FrameLocator | Locator,
  controlName: string
) => {
  return getControlByName(frame, controlName).locator(
    `div[data-control-part="text"]`
  );
};
