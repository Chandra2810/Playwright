import { Dialog, Locator, Page, expect } from "@playwright/test";

export class Alerts {
    readonly page: Page
    readonly Locators: {[key: string]:Locator}
    constructor(page: Page){
        this.page = page,
        this.Locators = {
            submitButton: page.locator('#alertbtn'),
            confirmButton: page.locator('#confirmbtn')
        }
    }

    async handlingAlert(action: "accept" | "dismiss" | "confirm", button: Locator){
        this.page.once('dialog', async (dialog:Dialog) => {
            const message = dialog.message()
            console.log(message);
            await dialog[action]()
        })      
        await button.click()  
    }

    async submitAlert(){       
        await this.handlingAlert("accept", this.Locators.submitButton)
    }

    async dismissAlert(){
        await this.handlingAlert('dismiss', this.Locators.confirmButton)
    }
    async confirmAlert(){
        await this.handlingAlert('confirm', this.Locators.confirmButton)
    }

}