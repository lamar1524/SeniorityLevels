import { browser, by, element } from 'protractor';
import { LoginPage } from '../authentication/login.po';

export class UserPage {
  login() {
    return browser.get(browser.baseUrl);
  }

  async navigateTo() {
    await this.login();
    const page = new LoginPage();
    page.loginInput.sendKeys('testy@e2e.pl');
    page.passwordInput.sendKeys('elemele1');
    page.loginButton.click();
    await browser.driver.wait(async () => (await browser.getCurrentUrl()) !== browser.baseUrl, 5000);
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
