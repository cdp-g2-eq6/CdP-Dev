const {By, Builder, until} = require('selenium-webdriver');

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

    // PQ CA MARCHE PASSSSS?????????????????????????????????????????????????????
    const backlogLink = await driver.findElement(By.css('#backlog-link'));

    // C'EST TOUJOURS UNE PROMISE ICI???????????????????????????????????????????????
    console.log(backlogLink);

    expect(backlogLink.className).to.be.equal('is-active is-expanded');
  }, TIMEOUT);

  // Example to wait for an element to be loaded
  /*
  await driver.wait(
    async () => await until.elementIsVisible(await driver.findElement(By.css('.pop-up-wrapper'))),
    TIMEOUT
  );
  */
});
