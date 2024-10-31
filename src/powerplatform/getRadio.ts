import { FrameLocator, Locator } from "@playwright/test";
import { getControlByName } from "./getControlByName";

export const getRadio = (
  frame: FrameLocator | Locator,
  controlName: string
) => {
  return getControlByName(frame, controlName).getByRole("radiogroup");
};
