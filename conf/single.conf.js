const AxeBuilder = require('@axe-core/webdriverio').default;

exports.config = {
  services: [
    [
      "lambdatest",
      {
        tunnel: false,
        lambdatestOpts: {
          logFile: "tunnel.log"
        }
      }
    ]
  ],
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,
  buildName: process.env.LT_BUILD_NAME,
  specs: ["./tests/specs/single_test.js"],
  exclude: [],

  capabilities: [
    {
      "LT:Options": {
        browserName: "chrome",
        version: "latest",
        name: "Test WebdriverIO Single",
        build: "WebDriver Selenium Sample"
      }
    }],
  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  waitforTimeout: 100000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 1,
  path: "/wd/hub",
  hostname: "hub.lambdatest.com",
  port: 80,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd"
  },

  /**
      * Gets executed before test execution begins. At this point you can access to all global
      * variables like `browser`. It is the perfect place to define custom commands.
      * @param {Array.<Object>} capabilities list of capabilities details
      * @param {Array.<String>} specs        List of spec file paths that are to be run
      * @param {Object}         browser      instance of created browser/device session
      */
  before: function (capabilities, specs, browser) {
    const axeWdio = new AxeBuilder({ client: browser })

    // set up command to run axe
    browser.addCommand('getAxeResults', async () => {
      return axeWdio.analyze()
        .then(async (result) => {
          return result
        })
        .catch(err => {
          console.log(err)
        })
    })

  }

};
