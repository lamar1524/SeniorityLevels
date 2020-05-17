import { LoginPage } from './login.po';

describe('login page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should assign form header properly', () => {
    page.navigateTo();
    expect(page.formHeader.getText()).toEqual('Login');
  });

  describe('form input states', () => {
    beforeEach(() => {
      page.navigateTo();
    });

    it('input should change state if it is invalid', () => {
      page.loginInput.sendKeys('foo');
      page.passwordInput.click();
      expect(page.loginInput.getAttribute('class')).toContain('ng-invalid');
    });

    it('input should change state if it is valid', () => {
      page.loginInput.sendKeys('foo@bar.com');
      page.passwordInput.click();
      expect(page.loginInput.getAttribute('class')).toContain('ng-valid');
    });

    it('button should change state after click', () => {
      page.loginInput.sendKeys('foo@bar.com');
      page.passwordInput.sendKeys('foobar');
      page.loginButton.click();
      expect(page.loginButton.getText()).not.toEqual('Login');
    });
  });
});
