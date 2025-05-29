import {test as base, Page} from "@playwright/test"

type FillForm = {
    firstName: string
    lastName: string
    email: string
    phoneNumber: number
}

const fillForm : FillForm ={
    firstName: "chandrashekar",
    lastName: "thippani",
    email: "@gmail.com",
    phoneNumber: 889780988
}

export const test = base.extend<{fillForm: FillForm}>({
    fillForm: async ({}, use) => {
        fillForm
        await use(fillForm)
    }
})

export {expect} from '@playwright/test'
