import { Page, expect, Locator } from "@playwright/test";

export class Frames{
    readonly page: Page
    readonly userName: Locator
    readonly button: Locator
    constructor(page: Page){
        this.page = page,
        this.userName = page.locator('[name="fldLoginUserId"]')
        this.button = page.locator('//a[text()="CONTINUE"]')
    }
    async isVisible(){
        const frameLocator = this.page.frameLocator('[name="login_page"]')
        await frameLocator.locator(this.userName).fill("Chandrashekar")
        await frameLocator.locator(this.button).click()
    }
}