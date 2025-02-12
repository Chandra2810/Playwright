import { Page, test, expect } from "@playwright/test";
import { DatePicker } from "./datePicker";

test("select a date" , async ({page}) => {
    const datePicker = new DatePicker(page)
    await page.goto('https://www.globalsqa.com/demo-site/datepicker/')
    await page.click('button:has-text("Consent")')
    await datePicker.selectDate()
    await page.pause()
})