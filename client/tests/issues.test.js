const {Builder, Capabilities} = require('selenium-webdriver');
const {click, waitForPageToBeLoaded} = require('./selenium_utils');

const TIMEOUT = 5000;
let driver;

describe('Issues test', () => {
  beforeAll(async function() {
    const chromeCapabilities = Capabilities.chrome();
    const chromeOptions = {
      args: [
        // '--no-sandbox',
        '--headless',
        // '--disable-dev-shm-usage',
        // 'window-size=1024,768',
        // '--disable-gpu',
      ],
    };
    chromeCapabilities.set('goog:chromeOptions', chromeOptions);
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
