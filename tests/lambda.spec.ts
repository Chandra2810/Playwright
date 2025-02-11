import {test, expect} from "@playwright/test"
import { Frames } from "./pages/frames"


test("Work around", async({page})=>{
    await page.goto('/')
    const frame = new Frames(page)
    await frame.isVisible()    
})