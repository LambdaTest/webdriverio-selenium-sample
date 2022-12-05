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
    specs: ["../tests/specs/integration_test.js"],
    exclude: [],
  
    capabilities: [
      {
        "LT:Options": {
        browserName: "chrome",
        version: "latest",
        name: "Test WebdriverIO QA-Deputy",
        build: "WebDriver Selenium  QA-Deputy Sample"
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
    }
  };
  