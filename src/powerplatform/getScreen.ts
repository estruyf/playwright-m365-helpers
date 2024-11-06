import { FrameLocator, Locator } from "@playwright/test";
import { getControlByName } from "./getControlByName";

export const getScreen = (
  frame: FrameLocator | Locator,
  screenName: string
) => {
  return getControlByName(frame, screenName);
};
