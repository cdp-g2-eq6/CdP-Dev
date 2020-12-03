const chrome = require('selenium-webdriver/chrome');
const {Builder} = require('selenium-webdriver');
const {click} = require('./selenium_utils');

const TIMEOUT = 10000;
let driver;

describe('Issues test', () => {
  beforeAll(async () => {
    driver = await (new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless())
        .build());

    expect(driver).toBeDefined();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('The backlog link in the navbar is active once clicked', async () => {
    console.log('2');
    // Go to the page
    await driver.get('http://localhost:8080');
    // await waitForPageToBeLoaded(driver);
    console.log('3');
    // Click the navbar link
    let backlogLink = await driver.findElement({id: 'backlog-link'});
    console.log('4');
    await click(driver, backlogLink);
    console.log('5');

    // Check its classes
    backlogLink = driver.findElement({id: 'backlog-link'});
    console.log('6');
    const clazz = await backlogLink.getAttribute('class');
    console.log('7');
    expect(clazz).toBe('is-active is-expanded');
  }, TIMEOUT);
});
