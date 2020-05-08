import { browser, by, element } from 'protractor';
import { login } from '../utils/Utils';

export class SkillPage {
  async navigateTo() {
    await login();
    browser.get(browser.baseUrl + '/dashboard/skills/skill/web-technology');
    browser.driver.wait(() => this.container.isPresent(), 5000);
  }

  get container() {
    return element(by.css('app-skill .container'));
  }

  get table() {
    return element(by.css('.table'));
  }

  get subCategories() {
    return element.all(by.css('.table__label'));
  }

  get skillContent() {
    return element.all(by.css('.table__content'));
  }

  get spinner() {
    return element(by.css('.spinner__wrapper'));
  }
}
