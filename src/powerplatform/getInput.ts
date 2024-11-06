import { FrameLocator, Locator } from "@playwright/test";
import { getControlByName } from "./getControlByName";

export const getInput = (
  frame: FrameLocator | Locator,
  controlName: string,
  multiline: boolean = false
) => {
  return getControlByName(frame, controlName).locator(
    !multiline ? "input" : "textarea"
  );
};
