import { by, element } from 'protractor';

export class NavigationPo {
  get usersListButton() {
    return element(by.css('.users-list__link'));
  }
}
