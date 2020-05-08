import { browser } from 'protractor';
import { SkillPage } from './skill.po';

describe('skill page', () => {
  let page: SkillPage;

  beforeAll(async () => {
    page = new SkillPage();
    await page.navigateTo();
  });

  describe('skill table', () => {
    it('should display table', () => {
      expect(page.table.isPresent()).toBeTruthy();
    });

    it('should display labels properly', () => {
      browser.driver.wait(() => page.subCategories.isPresent(), 5000);
      expect(page.subCategories.count()).toEqual(8);
    });

    it('should display values properly', () => {
      browser.driver.wait(() => page.skillContent.isPresent(), 5000);
      expect(page.skillContent.getText()).toContain(
        'Zna podstawowe metody optymalizacji zasobów (np. minifikacja kodu źródłowego,' +
          ' kompresja gzip). Rozumie jak działa "async" i "deffered".',
      );
    });

    it('should display reaction to click properly', () => {
      browser.driver.wait(() => page.skillContent.isPresent(), 5000);
      page.skillContent.click();
      expect(page.spinner.isPresent).toBeTruthy();
    });
  });

  describe('comments', () => {
    describe('labels', () => {
      it('should display proper state state', () => {
        browser.driver.wait(() => page.commentPublic.isPresent());
        expect(page.commentPublic.getAttribute('class')).toContain('u-block--underlined');
      });

      it('should change state when set to private', () => {
        browser.driver.wait(() => page.commentPrivate.isPresent());
        page.commentPrivate.click();
        expect(page.commentPrivate.getAttribute('class')).toContain('u-block--underlined');
      });

      it('should change state when set to public', () => {
        page.commentPublic.click();
        expect(page.commentPublic.getAttribute('class')).toContain('u-block--underlined');
      });
    });

    describe('adding comment', () => {
      it('click on add comment should toggle comment form', () => {
        page.showAddFormButton.click();
        expect(page.addCommentForm.isPresent()).toBeTruthy();
        page.showAddFormButton.click();
        expect(page.addCommentForm.isPresent()).toBeFalsy();
      });

      it('should add comment and refresh list', () => {
        page.showAddFormButton.click();
        page.addCommentTextArea.sendKeys('Testing comment');
        page.addCommentButton.click();
        expect(page.addCommentForm.isPresent()).toBeFalsy();
        expect(page.message.isPresent()).toBeFalsy();
        expect(page.comment.isPresent()).toBeTruthy();
      });
    });

    describe('editing comment', () => {});
  });
});
