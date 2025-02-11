import { Page, expect, Locator } from "@playwright/test";

export class SelectTools{
    readonly page: Page
    readonly locators : {
        [key:string] : Locator
    }
    constructor(page:Page){
        this.page = page
        this.locators = {
            singUpButton: page.getByText('SignUp Form'),
            toolOptions: page.locator('select#tools')
        }
    }
    async selectTool(){
        await this.locators.singUpButton.click()
        const count = await this.locators.toolOptions.count()
        await this.locators.toolOptions.selectOption({value: 'protractor'})
        await this.locators.toolOptions.selectOption({index: 5})
        await this.locators.toolOptions.selectOption({label: 'Selenium'})
        await expect(this.locators.toolOptions).toHaveValue('selenium')
        
    }
    
}