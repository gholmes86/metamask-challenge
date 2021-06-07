'use strict';
const adapter = require('detox/runners/jest/DetoxAdapterImpl');
const {detox} = require('detox/local-cli/utils/splitArgv');
describe('QA Challenge Test', () => {
  beforeEach(() => {
    jest.setTimeout(170000);
  });
  beforeEach(async () => {
    await device.launchApp({newInstance: true});
  });
  it('should confirm we are on the onboarding screen', async () => {
    // Check that we are on the home screen
    await expect(element(by.id('onboarding-screen'))).toBeVisible();
  });

  it('should verify MetaMask Welcome page text and page elements display', async () => {
    await expect(element(by.text('MetaMask Demo'))).toBeVisible();
    await expect(element(by.text('Welcome'))).toBeVisible();
    await expect(element(by.text('Sign Up'))).toBeVisible();
  });

  it('should confirm the user lands on the Sign Up page', async () => {
    const signUpBtn = await element(by.text('Sign Up'));
    await signUpBtn.tap();
    await expect(element(by.text('Enter an email'))).toBeVisible();
  });

  it('should verify the welcome back button redirects', async () => {
    const signUpBtn = await element(by.text('Sign Up'));
    await signUpBtn.tap();
    await element(by.label('Welcome, back')).atIndex(1).tap();
    await expect(signUpBtn).toBeVisible();
  });

  it('should verify the user cannot sign up with blank input', async () => {
    const signUpBtn = await element(by.text('Sign Up'));
    await signUpBtn.tap();
    await element(by.text('Next')).tap();
    await expect(
      element(by.text('You need to enter your email')),
    ).toBeVisible();
    await expect(
      element(by.text('You need to enter your password')),
    ).toBeVisible();
  });
  it('should verify email error message displays', async () => {
    const signUpBtn = await element(by.text('Sign Up'));
    await signUpBtn.tap();
    await expect(element(by.text('Email'))).toBeVisible();
    const emailField = element(by.type('RCTUITextField')).atIndex(0);
    await emailField.typeText('gma');
    const passwordField = element(by.type('RCTUITextField')).atIndex(1);
    await passwordField.typeText('password33333');
    await element(by.text('Next')).tap();
    await expect(element(by.text('Email is not correct'))).tobevisible;
  });
  it('should verify the password error message displays', async () => {
    const signUpBtn = await element(by.text('Sign Up'));
    await signUpBtn.tap();
    await expect(element(by.text('Email'))).toBeVisible();
    const emailField = await element(by.type('RCTUITextField')).atIndex(0);
    await emailField.typeText('test@gmail.com\n');
    const passwordField = await element(by.type('RCTUITextField')).atIndex(1);
    await passwordField.typeText('pas\n');
    await element(by.text('Next')).tap();
    await expect(
      element(
        by.text('You to enter your password with more than 11 character'),
      ),
    ).tobevisible;
  });
  it('should confirm a user is able to successfully sign up to MetaMask', async () => {
    const username = 'test100@gmail.com';
    const signUpBtn = await element(by.text('Sign Up'));
    await signUpBtn.tap();
    await expect(element(by.text('Email'))).toBeVisible();
    const emailField = element(by.type('RCTUITextField')).atIndex(0);
    await emailField.typeText(username);
    const passwordField = element(by.type('RCTUITextField')).atIndex(1);
    await passwordField.typeText('password33333');
    await element(by.text('Next')).tap();
    await expect(element(by.text('Welcome' + username))).tobevisible;
  });
});
