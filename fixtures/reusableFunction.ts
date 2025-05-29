import { Locator, Page, expect } from "@playwright/test";

export class LoginPage{
    	readonly page: Page
    	readonly searchBox: Locator
	    readonly productItems : Locator
	constructor(page: Page){
		this.page = page
		this.searchBox = this.page.getByPlaceholder('Search for Products, Brands and More')
		this.productItems = this.page.locator('._75nlfW .syl9yP')
    }
	async getBagsText(){
		await this.page.goto('https://www.flipkart.com/')  
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.searchBox).toBeVisible()      
		await this.searchBox.fill('shoes')
        await this.page.keyboard.press('Enter')
        await this.page.waitForLoadState('networkidle')
	}
}