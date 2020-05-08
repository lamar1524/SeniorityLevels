import { browser } from 'protractor';
import { UsersProfile } from './users-profile.po';

describe('user profile page', () => {
  let page: UsersProfile;

  beforeAll(async () => {
    page = new UsersProfile();
    await page.navigateTo();
  });

  describe('links', () => {
    it('should redirect properly', async () => {
      const urlBefore = await browser.getCurrentUrl();
      page.commentsLink.click();
      expect(urlBefore).not.toEqual(await browser.getCurrentUrl());
    });
  });
});
