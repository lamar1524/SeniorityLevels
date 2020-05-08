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

  describe('comments', () => {});
});
