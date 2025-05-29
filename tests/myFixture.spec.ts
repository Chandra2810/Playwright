import {test, expect, request, BrowserContext, APIRequestContext, APIResponse, Page, FrameLocator, Locator} from '@playwright/test'
import { LoginPage } from '../fixtures/reusableFunction'
import { error } from 'console'

test('get user details', async ({browser}) => {
    const newContext: BrowserContext = await browser.newContext()
    const page: Page = await newContext.newPage()
    await page.goto('https://letcode.in/frame')
    const frameLocator: FrameLocator = page.frameLocator('iframe#firstFr')
    const firstNameInputField: Locator = frameLocator.locator('input[name="fname"]')
    await firstNameInputField.waitFor({state: 'visible'})
    await firstNameInputField.fill('chandrashekar')
    await expect(firstNameInputField).toHaveValue('chandrashekar') 
   
})

test('handling re-uable function' , async ({browser}) => {
    const newContext = await browser.newContext()
    const page = await newContext.newPage()
    const loginPage = new LoginPage(page)
    await loginPage.getBagsText()
    const topFiveShoesPrice = await page.locator('.Nx9bqj').allTextContents()
    const output = []
    for(let i=0; i<=5; i++){
        let onlyNumber = topFiveShoesPrice[i].match(/[\d]+/)?.join('')
    }
})
test('assertions', async({page}) => {
    const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

expect(users).toEqual([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]);

expect(users[0]).toMatchObject({
    id: expect.any(String)
})
})

test('go around cbre', async ({page}) => {
    await page.goto('https://www.cbre.co.in/')
    const title = await page.evaluate(() => {
        return document.title
    }) 
    console.log(title);   
    
    
    
    
})
