import { FrameLocator, Locator } from "@playwright/test";

export const getRadioOptions = async (
  frame: FrameLocator,
  radio: Locator,
  isSelected = false
) => {
  const options = radio.locator(
    `.radio-label${isSelected ? ".selected" : ""}`,
    {
      has: frame.locator("input[type=radio]"),
    }
  );

  return options;
};
