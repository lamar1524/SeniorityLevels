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

  get commentPublic() {
    return element(by.css('.comment--public'));
  }

  get commentPrivate() {
    return element(by.css('.comment--private'));
  }

  get showAddFormButton() {
    return element(by.css('.container .u-text--link'));
  }

  get addCommentForm() {
    return element(by.css('.comment__form-group'));
  }

  get addCommentTextArea() {
    return element(by.css('textarea.form-control'));
  }

  get addCommentButton() {
    return element(by.css('.button__wrapper button'));
  }

  get message() {
    return element(by.css('.message'));
  }

  get comment() {
    return element(by.css('.comment'));
  }
}
