import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  get formHeader() {
    return element(by.css('.login__header h2'));
  }

  get loginInput() {
    return element(by.css('.email__field'));
  }

  get passwordInput() {
    return element(by.css('.password__field'));
  }

  get loginButton() {
    return element(by.css('.form__button'));
  }
}
