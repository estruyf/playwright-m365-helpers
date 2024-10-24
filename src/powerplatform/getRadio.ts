import { FrameLocator } from "@playwright/test";
import { getControlByName } from "./getControlByName";

export const getRadio = (frame: FrameLocator, controlName: string) => {
  return getControlByName(frame, controlName).getByRole("radiogroup");
};
