const {Builder} = require('selenium-webdriver');

const BROWSER = 'chrome';
const TIMEOUT = 5000;
let driver;

describe('Issues test', () => {
  beforeAll(async function () {
    driver = await new Builder()
        .forBrowser(BROWSER)
        .build();
  });

  afterAll(async function() {
    await driver.quit();
  });

  it('The backlog link in the navbar is active', async () => {
    await driver.get('http://localhost:8080/backlog');

    // Wait for the page to load
    driver.wait(() => {
      return driver.executeScript('return document.readyState').then(function(readyState) {
        return readyState === 'complete';
      });
    }, TIMEOUT);

    // Returns a WebDriver.Element
    const backlogLink = await driver.findElement({id: 'backlog-link'});
    const clazz = await backlogLink.getAttribute('class');
    const t = await backlogLink.getTagName();
    expect(clazz).toBe('is-active is-expanded');
  }, TIMEOUT);

  // Example to wait for an element to be loaded
  /*
  await driver.wait(
    async () => await until.elementIsVisible(await driver.findElement(By.css('.pop-up-wrapper'))),
    TIMEOUT
  );
  */
});
