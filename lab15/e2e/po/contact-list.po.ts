import { PageObject } from './page-object';

export class ContactListPageObject extends PageObject {

  public contacts = this.host.locator('tbody tr');
}
