import { Page, Locator, expect } from "@playwright/test";

export class AddUser {
  readonly page: Page
  readonly userForm: Locator
  readonly firstName: Locator
  readonly lastName: Locator
  readonly emailId: Locator
  readonly password: Locator
  readonly submitBtn : Locator
  constructor(page:Page){
    this.page = page,
    this.userForm = page.locator('form#add-user'),
    this.firstName = page.getByPlaceholder('First Name', {exact: true})
    this.lastName = page.getByPlaceholder('Last Name', {exact: true})
    this.emailId = page.getByPlaceholder('Email', {exact: true})
    this.password = page.getByPlaceholder('Password', {exact: true})
    this.submitBtn = page.getByRole('button', {name: 'Submit'})
  }
  async addUserContactsAndSubmit(fName: string, lName: string, Password: string, email: string){
    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/addUser')
    await this.firstName.fill(fName)
    await this.lastName.fill(lName)
    await this.password.fill(Password)
    await this.emailId.fill(email)
    await this.submitBtn.click()
  }
}