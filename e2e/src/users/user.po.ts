import { browser, by, element } from 'protractor';

import { login } from '../utils/Utils';

export class UserPage {
  async navigateTo() {
    await login();
    browser.driver.wait(() => this.header.isPresent(), 5000);
  }

  get header() {
    return element(by.css('.profile__introduction h1'));
  }

  get editCredentialsButton() {
    return element(by.css('.button--edit'));
  }

  get deleteUserButton() {
    return element(by.css('.button--delete'));
  }

  get editForm() {
    return element(by.css('.edit__form'));
  }

  get firstNameField() {
    return element(by.css('.first-name__field'));
  }

  get lastNameField() {
    return element(by.css('.last-name__field'));
  }

  get sendButton() {
    return element(by.css('.form__button'));
  }

  get deleteDialog() {
    return element(by.css('app-dialog .container'));
  }

  get hideDeleteDialogButton() {
    return element(by.css('.button__wrapper .mat-warn'));
  }
}
