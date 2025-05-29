import { Page, test, expect, Locator } from "@playwright/test";
import fs from 'fs'

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
    test('shadow elements' , async ({page}) => {
        await page.goto('https://qavbox.github.io/demo/shadowDOM/')
        const shadowHost = page.locator('my-open-component')
        await shadowHost.locator('input[type="text"]').fill('Chandra')
    })
    test('set file uploads', async ({page}) => {
        await page.goto('https://qavbox.github.io/demo/signup/')  
        await page.locator('[name="datafile"]')
            .setInputFiles('D:\\PlayWright\\uploads\\maths.jpeg')
        const fileValue  = await page.locator('[name="datafile"]').inputValue()
        console.log(fileValue);

    })
    test('data object', async ({page}) => {
        type Data = {
            [key: string]:string[]
        }
        let data:Data = {
            name: ["chandra", "shekar", "sowjanya", "ashwika", "tanay"]
        }
        await page.goto('https://letcode.in/edit')
        const fullName = page.getByPlaceholder('Enter first & last name')  
        const [values]:string[][] = Object.values(data)   
        for(let value of values){
            await fullName.fill(value)
        }        
    })
    test("form validations", async ({page}) => {
        await page.goto('https://letcode.in/edit')
        type Data = {
            [key:string]:string
        }
        let data: Data = {
            name: "chandra",
            mobile: "449140944",
        }
        let nameValue: string = data.name
        let mobileValue: string = data.mobile
        await page.getByPlaceholder('Enter first & last name').fill(nameValue)
        const appendText = page.locator('#join')
        await appendText.fill(mobileValue)
        await page.keyboard.press('Tab')
        const getValue = await page.locator('#getMe').getAttribute('value')
        console.log(getValue);
        await page.locator('#clearMe').clear()
        if(await page.locator('#noEdit').isDisabled()){
            console.log(true);
        }
        if(!await page.locator('#dontwrite').isEditable()){
            console.log(true);
        }else{
            await page.locator('#dontwrite').fill('hello')
        }
    })
    test('json data', async ({page}) => {
        await page.goto('https://letcode.in/edit')
        type Data = {
            [key:string]: string[]
        }
        const data: Data = {
            fullName: ["John Doe", "chandra"],
            joinText: ["Hello","bye"],
            // appendText: " World",
            // getTextValue: "",
            // clearText: "Some text",
            // disabledInput: "",
            // readOnlyInput: "This is readonly"
        };
        for(let i=0; i<2;i++){
            await page.getByPlaceholder('Enter first & last name').fill(data.fullName[i])
            await page.locator('#join').fill(data.joinText[i])
        }          
    })
    test('file download', async ({page}) => {      
        await page.goto('https://letcode.in/file')
        const [downloadTxt] = await Promise.all([
            page.waitForEvent('download'),
            page.click('a:has-text("Download Text")')
        ])
        const filePath: string = 'D:\\PlayWright\\downloads\\data1.txt'
        await downloadTxt.saveAs(filePath)    
        
        const file = fs.readdirSync('D:/PlayWright/downloads')
        console.log(file.includes('data1.txt'));

    })
    test('@smoke upload file', async ({page}) => {
        await page.goto('https://letcode.in/file')
        const filePath = 'D:\\PlayWright\\uploads\\maths.jpeg'
        page.on('filechooser', async (filechooser) => {
            await filechooser.setFiles(filePath)            
        })
        await page.locator('[name="resume"]').click()
        const textValue = await page.locator('[name="resume"]').inputValue()
        console.log(textValue);
       
    })
    test('search mobile', async({page}) => {
        await page.goto('https://www.amazon.in/')
        await page.getByPlaceholder('Search Amazon.in').fill('mobile')
        await page.locator('#nav-search-submit-button').click()
        const mobiletextItems = page.locator('[data-cy="title-recipe"] a h2')
        await mobiletextItems.waitFor({state: 'visible'})
        const count = await mobiletextItems.count()
        console.log(count);        
        
    })
})