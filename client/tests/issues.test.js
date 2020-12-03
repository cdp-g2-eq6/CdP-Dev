const chrome = require('selenium-webdriver/chrome');
const {Builder} = require('selenium-webdriver');
const {click, waitForPageToBeLoaded} = require('./selenium_utils');

describe('Issues test', () => {
  const TIMEOUT = 10000;
  let driver;

  beforeAll(async () => {
    driver = await (new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless())
        .build());

    it('should load the driver correctly', () => {
      expect(driver).toBeDefined();
    });
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('The backlog link in the navbar is active once clicked', async () => {
    // Go to the page
    await driver.get('http://localhost:8080');
    await waitForPageToBeLoaded(driver);

    // Click the navbar link
    let backlogLink = await driver.findElement({id: 'backlog-link'});
    await click(driver, backlogLink);

    // Check its classes
    backlogLink = driver.findElement({id: 'backlog-link'});
    const clazz = await backlogLink.getAttribute('class');
    expect(clazz).toBe('is-active is-expanded');
  }, TIMEOUT);
});
