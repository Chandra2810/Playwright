import { FrameLocator, Locator, Page, expect } from "@playwright/test";

export class DatePicker {
    readonly page: Page
    readonly firstFrame: FrameLocator
    readonly Locators: {[key: string]:Locator}
    constructor(page: Page){
        this.page = page,
        this.firstFrame= page.locator('.demo-frame').nth(0).contentFrame()
        this.Locators = {            
            dateInputBox: page.locator('input#datepicker'),
            prevDate: page.locator('[data-handler="prev"]'),
            nextDate: page.locator('[data-handler="next"]'),            
        }        
    }
    async selectDate(){              
        await this.firstFrame.locator('input#datepicker').click()
        await this.firstFrame.locator('table.ui-datepicker-calendar').waitFor({state: 'visible'})
        const nov = this.firstFrame.locator('span:has-text("November")')
       
        let maxTries = 12
        while(maxTries > 0){
            const textContent = await this.firstFrame.locator('div.ui-datepicker-title').textContent() 
            console.log(textContent);
            if(textContent === 'November 2024'){
                break
            }
            await this.firstFrame.locator('[data-handler="prev"]').click()
            maxTries--
        }
        await this.firstFrame.locator('a:has-text("30")').click() 

    //     do {          
    //        if(textContent === 'November 2024'){
    //         break;
    //        }
    //        await this.firstFrame.locator('[data-handler="prev"]').click()
    //     } while(true)       
    //     await this.firstFrame.locator('a:has-text("31")').click() 
    }
}