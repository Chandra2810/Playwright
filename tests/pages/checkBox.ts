import { Page, Locator, expect } from "@playwright/test";

export class CheckBox{
readonly page: Page
readonly locators: {[key:string]: Locator}

constructor(page:Page){
    this.page = page
    this.locators = {
        signUpButton: page.getByText('SignUp Form'),
        radioButton: page.locator('input[type="radio"]'),
        checkBoxAutomation: page.locator('input#ip')
    }
}
async selectRadio(){
    await this.locators.signUpButton.click()
    const count = await this.locators.radioButton.count()
    for(let i =0; i<count; i++){
        await this.locators.radioButton.nth(i).click()
        let value = await this.locators.radioButton.nth(i).getAttribute('value')
        console.log(`>>>> ${value}`);
        }      
    }
    async selectCheckBox() {
        await this.locators.signUpButton.click();
        const count = await this.locators.checkBoxAutomation.count();
    
        for (let i = 0; i < count; i++) {
            const checkbox = this.locators.checkBoxAutomation.nth(i);
            const value = (await checkbox.getAttribute('value')) as string; // Assert as string
    
            if (value === 'apitesting') {
                await checkbox.check(); // Use check() or click()
            }
    
            console.log(value);
        }
    }

}