import { expect, FrameLocator, Locator } from "@playwright/test";

export const selectDropdownOption = async (
  frame: FrameLocator,
  dropdown: Locator,
  value: string
) => {
  await expect(dropdown).toBeVisible();
  await dropdown.click();

  const dropdownDrop = frame.locator("div.drop.drop-enabled");
  await expect(dropdownDrop).toBeVisible();
  const dropdownOptions = await dropdownDrop
    .getByRole("listbox")
    .getByRole("option")
    .elementHandles();

  for (const option of dropdownOptions) {
    if ((await option.textContent()) === value) {
      await option.click();
      return;
    }
  }
};
