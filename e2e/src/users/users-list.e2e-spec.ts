import { browser } from 'protractor';
import { UsersList } from './users-list.po';

describe('users list page', () => {
  let page: UsersList;

  beforeAll(async () => {
    page = new UsersList();
    await page.navigateTo();
  });

  describe('render tests', () => {
    it('should display header properly', () => {
      expect(page.header.getText()).toEqual('Currently signed in users');
    });

    it('should redirect to users profile header properly', async () => {
      browser.driver.wait(() => page.table.isPresent(), 5000);
      page.tableLink.click();
      expect(await browser.getCurrentUrl()).toContain('/dashboard/users/user');
    });
  });
});
