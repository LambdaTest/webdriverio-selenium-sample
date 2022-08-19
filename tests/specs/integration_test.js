const assert = require('assert');
let request = require('async-request')

const statusMap  = {
  "inProgress": 2,
  "passed": 3,
  "failed": 4
}

describe('Google Search Function', () => {
  let testStatus;
  let test_case_id;
  let test_run_id;
  let api_token;
  let email;
  beforeEach("After Test", () => {
    testStatus = "failed";
  })

  it('can find search results', async () => {
    await browser.url('https://www.google.co.in/');
    const prompt = await $('[id="L2AGLb"]'); // consent popup is coming for other location which needs to be accepted to proceed
    if(prompt.elementId)
      await prompt.click();
    const input = await $('[name="q"]');
    await input.setValue('test123');
    const title = await browser.getTitle();
    await assert.equal(title, 'Google');
    testStatus = "passed";
  });

  afterEach("After Test", async () => {
    await browser.execute(status => `lambda-status=${status}`, testStatus)
    console.log("The params are ", process.env.testRunId || test_run_id, process.env.testCaseId || test_case_id, process.env.apiToken || api_token, process.env.email || email)
    const response = await request(`https://app.qadeputy.com/api/v1/test-runs/${process.env.testRunId || test_run_id}/test-cases/${process.env.testCaseId || test_case_id}`, {
      'method': 'PUT',
      'data': {
        'test_case_status': statusMap[testStatus],
        'actual_result': `Test ${testStatus}`
      },
      'headers': {
        'Authorization': `Bearer ${process.env.apiToken || api_token}`,
        'email': process.env.email || email,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    console.log(JSON.stringify(response))
  })
});
