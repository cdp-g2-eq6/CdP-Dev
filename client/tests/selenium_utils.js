/**
 * The promise resolves once that the page is loaded
 * (or that the timeout time is reached)
 *
 * @param {WebDriver} driver the web driver
 * @param {Number} timeout timeout number (ms)
 */
export const waitForPageToBeLoaded = async (driver, timeout) => {
    driver.wait(() => {
        return driver.executeScript('return document.readyState').then((readyState) => {
          return readyState === 'complete';
        });
    }, timeout);
}

/**
 * Prevents the issue “Element click is not clickable
 * at point (x, y). Other element would receive the
 * click ..."
 *
 * It does the same thing than webelement.click, but
 * it works lol
 *
 * The promise resolves once that the click is sent
 *
 * @param {WebDriver} driver the web driver
 * @param {WebElement} elem the element to click on
 */
export const click = async (driver, elem) => {
    driver.executeScript("arguments[0].click();", elem);
}