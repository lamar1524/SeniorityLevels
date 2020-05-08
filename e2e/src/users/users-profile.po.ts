import { browser, by, element } from 'protractor';
import { NavigationPo } from '../navigation/navigation.po';
import { login } from '../utils/Utils';

export class UsersProfile {
  userId = 'sv5gFlSjnLTQtZNtSft9buycgar2';

  async navigateTo() {
    await login();
    const nav = new NavigationPo();
    browser.driver.wait(() => nav.usersListButton.isPresent(), 5000);
    browser.get(browser.baseUrl + '/dashboard/users/user/' + this.userId);
    browser.driver.wait(() => this.profileWrapper.isPresent() && this.levels.isPresent(), 5000);
  }

  get profileWrapper() {
    return element(by.css('.profile__wrapper'));
  }

  get levels() {
    return element(by.css('.levels'));
  }

  get commentsLink() {
    return element(by.css('.details__link'));
  }
}
