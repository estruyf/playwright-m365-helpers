import { Locator } from "@playwright/test";

export const selectRadioOption = async (radio: Locator, value: string) => {
  const options = await radio.locator("input[type=radio]").elementHandles();
  for (const option of options) {
    if ((await option.getAttribute("value")) === value) {
      await option.click();
      return;
    }
  }
};
