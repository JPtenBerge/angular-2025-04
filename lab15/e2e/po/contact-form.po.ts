import { PageObject } from './page-object';

export class ContactFormPageObject extends PageObject {
  public submitButton = this.host.locator('form button');

  public async enter(value: {
    firstName: string;
    surname: string;
    email: string;
  }) {
    await this.enterFirstName(value.firstName);
    await this.enterSurname(value.surname);
    await this.enterEmail(value.email);
  }

  public async enterFirstName(value: string) {
    const firstName = this.host.locator('[name="firstName"]');
    await firstName.type(value);
  }
  public async enterSurname(value: string) {
    const surname = this.host.locator('[name="surname"]');
    await surname.type(value);
  }
  public async enterEmail(value: string) {
    const email = this.host.locator('[name="email"]');
    await email.type(value);
  }

  public async submit() {
    await this.submitButton.click();
  }
}
