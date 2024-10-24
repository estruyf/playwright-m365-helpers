import { Page } from "@playwright/test";
import * as OTPAuth from "otpauth";

export const login = async (
  page: Page,
  pageUrl?: string,
  userName?: string,
  password?: string,
  otpSecret?: string,
  staySignedInBtnValue: string = "Yes"
) => {
  if (!pageUrl) {
    throw new Error("Page URL is missing");
  }

  if (!userName || !password) {
    throw new Error("Username or password is missing");
  }

  await page.goto(pageUrl || "");

  const emailInput = page.locator("input[type=email]");
  await emailInput.click();
  await emailInput.fill(userName);

  await page.getByRole("button", { name: "Next" }).click();

  const passwordInput = page.locator("input[type=password]");
  await passwordInput.click();
  await passwordInput.fill(password);
  await page.locator("input[type=submit]").click();

  if (otpSecret) {
    // Check if there is an Microsft Authenticator app prompt
    const otherWayLink = page.locator("a#signInAnotherWay");
    await otherWayLink.waitFor({ timeout: 2000 });
    if (await otherWayLink.isVisible()) {
      await otherWayLink.click();

      const otpLink = page.locator(`div[data-value="PhoneAppOTP"]`);
      await otpLink.click();
    }

    // Fill in the OTP code
    const otpInput = await page.waitForSelector("input#idTxtBx_SAOTCC_OTC");
    let totp = new OTPAuth.TOTP({
      issuer: "Microsoft",
      label: userName,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: otpSecret,
    });
    const code = totp.generate();
    await otpInput.fill(code);

    await page.locator("input[type=submit]").click();
  }

  await page
    .locator(`input[type=submit][value=${staySignedInBtnValue}]`)
    .click();
  await page.waitForURL(pageUrl || "");
};
