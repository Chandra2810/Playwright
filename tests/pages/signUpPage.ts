import { Page, Locator, expect } from "@playwright/test";

export class SignUpForm {
  readonly page: Page;
  readonly fullName: Locator;
  readonly email: Locator;
  readonly button: Locator;
  readonly selectGender: Locator
  constructor(page: Page) {
    this.fullName = page.locator("#username");
    this.email = page.locator("#email");
    this.button = page.getByText("SignUp Form");
    this.selectGender = page.locator('select[name="sgender"]')
  }
  async fillForm(username: string, emailId: string): Promise<void> {
    try {
      await this.button.click();
      await this.fullName.fill(username);
      await this.email.fill(emailId);
      await this.selectGender.isVisible()
      await this.selectGender.selectOption({value: 'female'})
      await expect(this.selectGender).toHaveValue('female')
      
    } catch (error) {
      console.error(`${error}`);      
    }
  }
}
