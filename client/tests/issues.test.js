const chrome = require('selenium-webdriver/chrome');
const {Builder, By} = require('selenium-webdriver');
const {click, waitForPageToBeLoaded, fillInput, wait} = require('./selenium_utils');

describe('Issues test', () => {
  // const TIMEOUT = 10000;
  let driver;

  beforeAll(async () => {
    driver = await (new Builder()
        .forBrowser('chrome')
        // .setChromeOptions(new chrome.Options().headless())
        .build());

    it('should load the driver correctly', () => {
      expect(driver).toBeDefined();
    });
  });

  afterAll(async () => {
    await driver.quit();
  });

  // gherkin.issue, test 1
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
  });

  const issue = {
    title: 'Titre de l\'issue',
    desc1: 'Utilisateur',
    desc2: 'Visualiser la liste des projets',
    desc3: 'Selectionner un projet',
    diff: 1,
    imp: 'Minimale',
  }

  // gherkin.issue, test 2
  it('Should create a new issue', async () => {
    // Click the edit mode button
    await driver.findElement({id: 'edit-button'}).click();

    // Click the plus button
    await driver.findElement(By.css('.add')).click();

    // Fill form
    const inputs = await driver.findElements({input: 'text', tagName: 'input'});
    await inputs[0].sendKeys(issue.title);
    await inputs[1].sendKeys(issue.desc1);
    await inputs[2].sendKeys(issue.desc2);
    await inputs[3].sendKeys(issue.desc3);

    // Valid
    await driver.findElement(By.css('.button.is-primary')).click();

    // Wait
    //await wait(1000);
    await waitForPageToBeLoaded(driver, 2000);

    expect(() => driver.findElement({id: 'issue'})).not.toThrow();
  });
});
