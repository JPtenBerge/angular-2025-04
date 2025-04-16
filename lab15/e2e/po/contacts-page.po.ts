import { Page } from '@playwright/test';
import { ContactFormPageObject } from './contact-form.po';
import { ContactListPageObject } from './contact-list.po';

export class ContactsPage {
  constructor(private page: Page) {}

  public navigateTo() {
    return this.page.goto('/');
  }

  public contactForm = new ContactFormPageObject(
    this.page.locator('.add-contact-form')
  );

  public contactList = new ContactListPageObject(
    this.page.locator('.all-contacts-list')
  );
}
