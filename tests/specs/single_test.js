const assert = require('assert');

describe('Google Search Function', () => {
  it('can find search results', () => {
    browser.url('https://www.google.co.in/');
    const input = $('[name="q"]');
    input.setValue('LambdaTest\n');
    const title = browser.getTitle();
    browser.pause(1000);
    assert.equal(title, 'LambdaTest - Google Search');
    browser.getAxeResults();
  });
});
