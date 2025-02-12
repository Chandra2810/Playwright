import { Page, test, expect, Locator } from "@playwright/test";

test.describe("all user interactions", async () => {
    
    test('multiple windows', async ({browser}) => {
        const newContext = await browser.newContext()
        const page = await newContext.newPage()
        await page.goto('https://vinothqaacademy.com/multiple-windows/')

        const [newPage] = await Promise.all([
            newContext.waitForEvent('page'),
            page.click('button:has-text("New Browser Window")')
        ])
        await newPage.waitForLoadState()
        console.log(await newPage.title());
        await expect(newPage).toHaveTitle('Demo Site - WebTable - Vinoth Q.A Academy')        
    })
    test("new message window", async ({browser}) => {
        const newContext =  await browser.newContext()
        const page = await newContext.newPage()

        await page.goto('https://vinothqaacademy.com/multiple-windows/')
        const [newPage] = await Promise.all([
            newContext.waitForEvent('page'),
            page.click('button:has-text("New Message Window")')
        ])
        await newPage.waitForLoadState()
        const text = await newPage.locator('body').textContent()
        console.log(text);
    })
    test('new browser tab', async ({browser}) => {
        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto('https://vinothqaacademy.com/multiple-windows/')

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.getByRole('button', {name: 'New Browser Tab'}).click()
        ])
        await newPage.waitForLoadState()
        const newTitle = await newPage.title()
        expect(await newPage.title()).toEqual('Demo Site - WebTable - Vinoth Q.A Academy')
    })
    test('mouse event', async ({page}) => {
        await page.goto('https://vinothqaacademy.com/mouse-event/')
        const textBox: Locator = page.locator('#textbox')
        await textBox.hover({force: true})
        await textBox.fill("chandra")
        const textValue = await textBox.inputValue()
        expect(textValue).toEqual('chandra')
        await page.dblclick('button:has-text("Double Click Me")')
        const rClick = page.locator('button:has-text("Right Click Me")')
        await rClick.click({button: 'right'})
        await page.locator('#myDiv').waitFor({state: 'visible'})
        const source = page.locator('#draggableElement')
        const dest = page.locator('#droppableElement')
        await source.dragTo(dest)
    })
    test("work wit list elements", async ({page}) => {
        await page.goto('https://www.amazon.in/')
        const linkAccounts = page.locator('#nav-link-accountList')
        await expect(linkAccounts).toBeVisible()
        await linkAccounts.hover({force: true})
        const yourAccount = await page.locator('#nav-al-your-account').locator('ul').getByRole('listitem').count()
        console.log(yourAccount);        
    })
    test.only('shadow elements' , async ({page}) => {
        await page.goto('https://qavbox.github.io/demo/shadowDOM/')
        const shadowHost = page.locator('my-open-component')
        await shadowHost.locator('input[type="text"]').fill('Chandra')
    })
})