const assert = require('assert');

describe('Search on web', () => {
  it('can find search results', async () => {
    await browser.url('https://www.google.co.in/');
    const prompt = await $('[id="L2AGLb"]'); // consent popup is coming for other location which needs to be accepted to proceed
    if(prompt.elementId)
      await prompt.click();
    const input = await $('[name="q"]');
    await input.setValue('test123');
    const title = await browser.getTitle();
    await browser.pause(10000);
    assert.equal(title, 'Google');
  });

  it('should match title on bing', async function () {
    // Get Puppeteer instance
    const puppeteer = await browser.getPuppeteer()
    const page = (await puppeteer.pages())[0]

    // Add event to check the responses from Browser
    page.on('response', async (response) => {
      let responseContentType = response.headers()['content-type']

      if (responseContentType && responseContentType.includes('application/json')) {
        console.log(`XHR Response received for: ${(response.url())} status: ${(response.status())}`);
      }
    });

    // continue with WebDriver commands
    await browser.url('https://bing.com')
    const searchElement = await browser.$('[aria-label=\'Enter your search term\'] > input');
    await searchElement.setValue('LambdaTest');
    const searchButton = await browser.$('#search_icon')
    await searchButton.click()
    const title = await browser.getTitle();
    assert.equal(title, 'LambdaTest - Search')
  });
});
