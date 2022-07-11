const assert = require('assert');

describe('Google Search Function', () => {
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
});
