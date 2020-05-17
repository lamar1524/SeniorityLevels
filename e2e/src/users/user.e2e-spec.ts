import { browser } from 'protractor';
import { UserPage } from './user.po';

describe('user page', () => {
  let page: UserPage;

  beforeAll(async () => {
    page = new UserPage();
    await page.navigateTo();
  });

  describe('actions tests', () => {
    it('page init', async () => {
      expect(await page.header.getText()).toEqual('Hello testy@e2e.pl');
    });
    describe('editing profile', () => {
      it('should show edit form', async () => {
        page.editCredentialsButton.click();
        expect(await page.editForm.isPresent()).toBeTruthy();
      });

      it('should hide edit form after success edit', async () => {
        page.firstNameField.sendKeys('First name');
        page.lastNameField.sendKeys('Last name');
        page.sendButton.click();
        browser.driver.wait(async () => {
          return !(await page.firstNameField.isPresent());
        }, 5000);
        expect(page.editForm.isPresent()).toBeFalsy();
      });
    });

    describe('deleting user', () => {
      it('should show delete dialog', () => {
        page.deleteUserButton.click();
        expect(page.deleteDialog.isPresent()).toBeTruthy();
      });

      it('should hide delete dialog', () => {
        page.hideDeleteDialogButton.click();
        expect(page.deleteDialog.isPresent()).toBeFalsy();
      });
    });
  });
});
