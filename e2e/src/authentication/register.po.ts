import { browser, by, element } from 'protractor';

export class RegisterPage {
  navigateTo() {
    return browser.get(browser.baseUrl + '/register') as Promise<any>;
  }

  get formHeader() {
    return element(by.css('.register__header h2'));
  }

  get emailInput() {
    return element(by.css('.email__input'));
  }

  get firstNameInput() {
    return element(by.css('.first-name__input'));
  }

  get lastNameInput() {
    return element(by.css('.last-name__input'));
  }

  get passwordInput() {
    return element(by.css('.password__input'));
  }

  get repeatPasswordInput() {
    return element(by.css('.repeat-password__input'));
  }

  get registerButton() {
    return element(by.css('.form__button'));
  }
}
