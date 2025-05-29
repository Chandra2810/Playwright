import {test as base} from '@playwright/test'

export const test = base.extend<{file: string}>({
    file: async({page}, use)=>{
        const input = "D:\\PlayWright\\uploads\\maths.jpeg" 
        await page.goto('https://letcode.in/')
        await page.locator('[name="resume"]').setInputFiles(input)
        await use(input)
    }
})