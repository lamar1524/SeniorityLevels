import { browser } from 'protractor';
import { LoginPage } from '../authentication/login.po';

export const login = async () => {
  await browser.get(browser.baseUrl);
  const page = new LoginPage();
  page.loginInput.sendKeys('testy@e2e.pl');
  page.passwordInput.sendKeys('elemele1');
  page.loginButton.click();
  await browser.driver.wait(async () => (await browser.getCurrentUrl()) !== browser.baseUrl, 5000);
};
