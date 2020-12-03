const {Builder, Capabilities} = require('selenium-webdriver');
const {click, waitForPageToBeLoaded} = require('./selenium_utils');

const url = 'http://' + (process.env.HOSTNAME || 'localhost') + ':8080';
const TIMEOUT = 10000;
let driver;
const chromeCapabilities = Capabilities.chrome();
const chromeOptions = {
  args: [
    '--headless',
  ],
};
chromeCapabilities.set('goog:chromeOptions', chromeOptions);

describe('Issues test', () => {
  beforeAll(async () => {
    driver = await new Builder()
        .forBrowser('chrome')
        .withCapabilities(chromeCapabilities)
        .build();

    expect(driver).toBeDefined();
    console.log("BEFORE ALL CALLEDDDDDDDDDDDDDDDDDDD");
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('The backlog link in the navbar is active once clicked', async () => {
    driver = await new Builder()
        .forBrowser('chrome')
        .withCapabilities(chromeCapabilities)
        .build();

    // Go to the page
    await driver.get(url);
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
