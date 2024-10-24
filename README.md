# Playwright helpers for Microsoft 365 projects

This repository contains a set of Playwright helpers for Microsoft 365 projects.

## Installation

```bash
npm i playwright-m365-helpers
```

## Usage

### Login to Microsoft 365

Create a new `login.setup.ts` file in your `tests` folder and add the following code:

```typescript
import { test as setup } from "@playwright/test";
import { login } from 'playwright-m365-helpers';

const AuthFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  
  await login(
    page,
    process.env.M365_PAGE_URL,
    process.env.M365_USERNAME,
    process.env.M365_PASSWORD,
    process.env.M365_OTP_SECRET // Optional
  );

  await page.context().storageState({ path: AuthFile });
});
```

> ![NOTE]
> In case of using Time-based One-Time Password (TOTP) for two-factor authentication, you can provide the secret key as the fourth parameter.
> To know more about signing in with TOTP, check the [automating Microsoft 365 login with multi-factor authentication in Playwright tests](https://www.eliostruyf.com/automating-microsoft-365-login-mfa-playwright-tests/) article.

Create a new project in the `playwright.config.ts` file with the following code:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  ...
  projects: [
    {
      name: "setup",
      testMatch: /login.setup.ts/,
    },
    {
      name: "chromium",
      use: {
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"], // This will run the setup project before the chromium project
    },
  ],
});
```

### Power Platform

There are various helpers for Power Platform projects:

- `getAppFrame` - Get the iframe of the Power Platform app

  ```typescript
  import { getAppFrame } from 'playwright-m365-helpers';

  test("Check if canvas is loaded", async () => {
    await getAppFrame(page);
  });
  ```

- `getControlByName` - Get the control by name
  
  ```typescript
  import { getAppFrame, getControlByName } from 'playwright-m365-helpers';

  test("Check if control is loaded", async () => {
    const appFrame = await getAppFrame(page);
    const control = getControlByName(appFrame, "controlName");
    await expect(control).toBeVisible();
  });
  ```

- `getButton` - Get the button by name

  ```typescript
  import { getAppFrame, getButton } from 'playwright-m365-helpers';

  test("Check if button is loaded", async () => {
    const appFrame = await getAppFrame(page);
    const button = getButton(appFrame, "buttonName");
    await expect(button).toBeVisible();
    await button.click();
  });
  ```

- `getDropdown` - Get the dropdown by name

  ```typescript
  import { getAppFrame, getDropdown } from 'playwright-m365-helpers';

  test("Check if dropdown is loaded", async () => {
    const appFrame = await getAppFrame(page);
    const dropdown = getDropdown(appFrame, "dropdownName");
    await expect(dropdown).toBeVisible();
  });
  ```

- `selectDropdownOption` - Select the dropdown option by its value

  ```typescript
  import { getAppFrame, getDropdown, selectDropdownOption } from 'playwright-m365-helpers';

  test("Check if dropdown option is selected", async () => {
    const appFrame = await getAppFrame(page);
    const dropdown = getDropdown(appFrame, "dropdownName");
    await selectDropdownOption(appFrame, dropdown, "dropdown value");
    await expect(dropdown).toHaveText(/dropdown value/);
  });
  ```

- `getInput` - Get the input by name

  ```typescript
  import { getAppFrame, getInput } from 'playwright-m365-helpers';

  test("Check if input is loaded", async () => {
    const appFrame = await getAppFrame(page);
    const input = getInput(appFrame, "inputName");
    await expect(input).toBeVisible();
    await input.fill("Hello World");
  });
  ```

- `getRadio` - Get the radio by name

  ```typescript
  import { getAppFrame, getRadio } from 'playwright-m365-helpers';

  test("Check if radio is loaded", async () => {
    const appFrame = await getAppFrame(page);
    const radio = getRadio(appFrame, "radioName");
    await expect(radio).toBeVisible();
  });
  ```

- `selectRadioOption` - Select the radio option by its value

  ```typescript
  import { getAppFrame, getRadio, selectRadioOption } from 'playwright-m365-helpers';

  test("Select a radio option", async () => {
    const appFrame = await getAppFrame(page);
    const radio = getRadio(appFrame, "radioName");
    await selectRadioOption(radio, "radio value");
  });
  ```

- `getRadioOptions` - Get the radio option(s)

  ```typescript
  import { getAppFrame, getRadio, getRadioOptions, selectRadioOption } from 'playwright-m365-helpers';

  test("Check if radio options are loaded", async () => {
    const appFrame = await getAppFrame(page);
    const radio = getRadio(appFrame, "radioName");
    await selectRadioOption(radio, "radio value");

    const selectedOption = await getRadioOptions(frame, radio, true);
    await expect(selectedOption).toHaveText(/radio value/);
  });
  ```

- `getToggle` - Get the toggle by name

  ```typescript
  import { getAppFrame, getToggle } from 'playwright-m365-helpers';

  test("Check if toggle is loaded", async () => {
    const appFrame = await getAppFrame(page);

    const toggle = getToggle(appFrame, "toggleName");
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-checked", "true");
  });
  ```

<br />

[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Festruyf%2Fplaywright-m365-helpers&countColor=%23263759)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Festruyf%2Fplaywright-m365-helpers)
