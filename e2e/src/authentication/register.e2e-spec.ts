import { browser, logging } from 'protractor';

import { RegisterPage } from './register.po';

describe('register page', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
  });

  it('should assign form header properly', () => {
    page.navigateTo();
    expect(page.formHeader.getText()).toEqual('Join us');
  });

  describe('form input states', () => {
    beforeEach(() => {
      page.navigateTo();
    });

    it('email input should change state if it is invalid', () => {
      page.emailInput.sendKeys('foo');
      page.firstNameInput.click();
      expect(page.emailInput.getAttribute('class')).toContain('ng-invalid');
    });

    it('email input should change state if it is valid', () => {
      page.emailInput.sendKeys('foo@bar.com');
      page.firstNameInput.click();
      expect(page.emailInput.getAttribute('class')).toContain('ng-valid');
    });

    it('first name input should change state if it is invalid', () => {
      page.firstNameInput.sendKeys('');
      page.lastNameInput.click();
      expect(page.firstNameInput.getAttribute('class')).toContain('ng-invalid');
    });

    it('first name input should change state if it is valid', () => {
      page.firstNameInput.sendKeys('foo');
      page.lastNameInput.click();
      expect(page.firstNameInput.getAttribute('class')).toContain('ng-valid');
    });

    it('last name input should change state if it is invalid', () => {
      page.lastNameInput.sendKeys('');
      page.passwordInput.click();
      expect(page.lastNameInput.getAttribute('class')).toContain('ng-invalid');
    });

    it('last name input should change state if it is valid', () => {
      page.lastNameInput.sendKeys('foo');
      page.passwordInput.click();
      expect(page.lastNameInput.getAttribute('class')).toContain('ng-valid');
    });

    it('password input should change state if it is invalid', () => {
      page.passwordInput.sendKeys('foo');
      page.lastNameInput.click();
      expect(page.passwordInput.getAttribute('class')).toContain('ng-invalid');
    });

    it('password input should change state if it is valid', () => {
      page.passwordInput.sendKeys('foobar');
      page.lastNameInput.click();
      expect(page.passwordInput.getAttribute('class')).toContain('ng-valid');
    });

    it('repeat password input should change state if it is invalid', () => {
      page.passwordInput.sendKeys('foobar');
      page.repeatPasswordInput.sendKeys('foobar2');
      page.lastNameInput.click();
      expect(page.repeatPasswordInput.getAttribute('class')).toContain('ng-invalid');
    });

    it('repeat password input should change state if it is valid', () => {
      page.passwordInput.sendKeys('foobar');
      page.repeatPasswordInput.sendKeys('foobar');
      page.lastNameInput.click();
      expect(page.repeatPasswordInput.getAttribute('class')).toContain('ng-valid');
    });

    it('button should be in default state after click', () => {
      expect(page.registerButton.getText()).toEqual('Register');
    });

    it('button should change state after click', () => {
      page.emailInput.sendKeys('foo@bar.com');
      page.firstNameInput.sendKeys('foo');
      page.lastNameInput.sendKeys('bar');
      page.passwordInput.sendKeys('foobar');
      page.repeatPasswordInput.sendKeys('foobar');
      page.registerButton.click();
      expect(page.registerButton.getText()).not.toEqual('Register');
    });
  });
});
