const {Builder, Capabilities} = require('selenium-webdriver');
const {click, waitForPageToBeLoaded} = require('./selenium_utils');

const TIMEOUT = 5000;
let driver;
const chromeCapabilities = Capabilities.chrome();
const chromeOptions = {
  args: [
    '--headless',
  ],
};
chromeCapabilities.set('goog:chromeOptions', chromeOptions);

describe('Issues test', () => {
  beforeAll(async function() {
    driver = await new Builder()
        .forBrowser('chrome')
        .withCapabilities(chromeCapabilities)
        .build();

    expect(driver).toBeDefined();
  });

  afterAll(async function() {
    await driver.quit();
  });

  it('The backlog link in the navbar is active once clicked', async () => {
    driver = await new Builder()
        .forBrowser('chrome')
        .withCapabilities(chromeCapabilities)
        .build();

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
