user= process.env.LT_USERNAME || "<your username>",
key=  process.env.LT_ACCESS_KEY || "<your accessKey>",

exports.config = {

  updateJob: false,
  user,
  key,
  specs: [
    './tests/specs/multiple_test.js'
  ],
  exclude: [],

  capabilities: [{
    browser: 'chrome',
    name: 'Multiple Sample Test',
    build: 'WebDriver Selenium Sample'
  }],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  path: '/wd/hub',
  hostname: 'hub.lambdatest.com',
  port: 80,
  framework: 'mocha',
  mochaOpts: {
      ui: 'bdd'
  }
}
