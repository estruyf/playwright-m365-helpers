import { FrameLocator, Locator } from "@playwright/test";
import { getControlPart } from "./getControlPart";

export const getGalleryItems = (frame: FrameLocator | Locator): Locator => {
  return getControlPart(frame, "gallery-item");
};
