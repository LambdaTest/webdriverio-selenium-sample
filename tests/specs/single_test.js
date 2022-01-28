const assert = require('assert');

describe('Google Search Function', () => {
  it('can find search results', () => {
    browser.url('https://www.google.co.in/');
    const input = $('[name="q"]');
    input.setValue('test123');
    const title = browser.getTitle();
    browser.pause(10000);
    assert.equal(title, 'Google');
  });
});
