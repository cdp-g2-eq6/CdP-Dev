const {Builder, Capabilities} = require('selenium-webdriver');
const {click} = require('./selenium_utils');

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
    /*
    driver = await new Builder()
        .forBrowser('chrome')
        .withCapabilities(chromeCapabilities)
        .build();

    expect(driver).toBeDefined();*/
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('The backlog link in the navbar is active once clicked', async () => {
    console.log('1');
    driver = await new Builder()
        .forBrowser('chrome')
        .withCapabilities(chromeCapabilities)
        .build();

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
