import { Page, test, expect } from "@playwright/test";
import { Alerts } from "./pages/alerts";

test.describe("Alerts handling tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.letskodeit.com/practice");
  });
  test("step 1: submit alerts", async ({ page }) => {
    const alerts = new Alerts(page);
    await alerts.submitAlert();
  });
  test("dismis alert", async ({ page }) => {
    const alerts = new Alerts(page);
    await alerts.confirmAlert();
  });
  test('step: 2 Confirm Alert', async ({page}) => {
    const alerts = new Alerts(page);
    await alerts.dismissAlert()
  })
});
