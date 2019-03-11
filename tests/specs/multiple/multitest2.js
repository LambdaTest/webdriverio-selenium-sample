const assert = require('assert');

describe('Google Search Function', () => {
  it('can find search results', () => {
    browser
      .url('https://www.google.com/ncr')
      const input = $('[name="q"]');
      input.setValue('Single Session Test 2');

      const title = browser.getTitle();
      assert.equal(title, 'Google');
  });
});
