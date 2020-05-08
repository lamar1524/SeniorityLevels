import { browser, by, element } from 'protractor';
import { NavigationPo } from '../navigation/navigation.po';
import { login } from '../utils/Utils';

export class UsersList {
  async navigateTo() {
    await login();
    const nav = new NavigationPo();
    browser.driver.wait(() => nav.usersListButton.isPresent(), 5000);
    nav.usersListButton.click();
    browser.driver.wait(() => this.container.isPresent(), 5000);
  }

  get container() {
    return element(by.css('app-users-list .container'));
  }

  get header() {
    return element(by.css('.users__header'));
  }

  get tableLink() {
    return element(by.css('td .u-text--link'));
  }
}
