const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key} = require('selenium-webdriver');
const {click, waitForPageToBeLoaded, wait} = require('./selenium_utils');

describe('Issues test', () => {
  const TIMEOUT = 30000;
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
  }, TIMEOUT);

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

    // Fill form
    await driver.findElement(By.css('.add')).click();
    let inputs = await driver.findElements({type: 'text', tagName: 'input'});
    await inputs[1].sendKeys(issue.title);
    await inputs[2].sendKeys(issue.desc1);
    await inputs[3].sendKeys(issue.desc2);
    await inputs[4].sendKeys(issue.desc3);
    await driver.findElement(By.css('.button.is-primary')).click();

    await wait(2000);

    // Fill form (once again so we will have 2 issues)
    await driver.findElement({id: 'edit-button'}).click();
    await driver.findElement(By.css('.add')).click();
    inputs = await driver.findElements({type: 'text', tagName: 'input'});
    await inputs[1].sendKeys(issue.title);
    await inputs[2].sendKeys(issue.desc1);
    await inputs[3].sendKeys(issue.desc2);
    await inputs[4].sendKeys(issue.desc3);
    await driver.findElement(By.css('.button.is-primary')).click();

    await wait(3000);

    await expect(async () => await driver.findElement({id: 'issue-0'})).not.toThrow();
  }, TIMEOUT);

  it('Should show the issue properly', async () => {
    const title = await driver.findElement(By.css('#issue .title.mb-1')).getText();
    expect(title).toBe(
      '#0. ' + issue.title
    )

    const desc = await driver.findElement(By.css('#issue .content span')).getText();
    expect(desc).toBe(
      'En tant que ' + issue.desc1 + ', je souhaite ' + issue.desc2 + ', afin de ' + issue.desc3 + '.'
    );
  }, TIMEOUT);

  const newIssue = {
    title: 'Selection du projet',
    desc1: 'Admin',
    desc2: 'Visualiser ma liste de projets',
    desc3: 'Selectionner un projet à gérer',
    diff: 1,
    imp: 'Minimale',
  }

  // gherkin.issue, test 3
  it('Should edit the current issue', async () => {
    await wait(2000);

    // Click the issue
    await driver.findElement({id: 'issue-0'}).click();

    // Fill form
    const inputs = await driver.findElements({type: 'text', tagName: 'input'});
    // 0 -> it's something else
    await inputs[1].sendKeys(Key.CONTROL + 'a');
    await inputs[1].sendKeys(Key.DELETE);
    await inputs[1].sendKeys(newIssue.title);

    await inputs[2].sendKeys(Key.CONTROL + 'a');
    await inputs[2].sendKeys(Key.DELETE);
    await inputs[2].sendKeys(newIssue.desc1);

    await inputs[3].sendKeys(Key.CONTROL + 'a');
    await inputs[3].sendKeys(Key.DELETE);
    await inputs[3].sendKeys(newIssue.desc2);

    await inputs[4].sendKeys(Key.CONTROL + 'a');
    await inputs[4].sendKeys(Key.DELETE);
    await inputs[4].sendKeys(newIssue.desc3);

    // Update
    await driver.findElement(By.css('.update .button.is-warning')).click();

    // Wait
    await wait(2000);

    await expect(async () => await driver.findElement({id: 'issue-0'})).not.toThrow();
  }, TIMEOUT);

  it('Should show the issue properly', async () => {
    const title = await driver.findElement(By.css('#issue .title.mb-1')).getText();
    expect(title).toBe(
      '#0. ' + newIssue.title
    )

    const desc = await driver.findElement(By.css('#issue .content span')).getText();
    expect(desc).toBe(
      'En tant que ' + newIssue.desc1 + ', je souhaite ' + newIssue.desc2 + ', afin de ' + newIssue.desc3 + '.'
    );
  }, TIMEOUT);

  it('Should delete the current issue', async () => {
    // Click the edit mode button
    // await driver.findElement({id: 'edit-button'}).click();

    await wait(2000);

    // Click the  button
    await driver.findElement({id: 'issue-0'}).click();

    // Delete
    await driver.findElement(By.css('.update .button.is-danger')).click();

    // Confirm
    await driver.findElement(By.css('.dialog .button.is-danger')).click();

    // Wait
    await wait(2000);

    await expect(() => driver.findElement({id: 'issue-0'})).rejects.toThrow();
  }, TIMEOUT);
});
