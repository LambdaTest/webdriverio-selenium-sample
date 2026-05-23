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
  specs: ["../tests/specs/single_test.js"],
  exclude: [],

    capabilities: [{
    	"browserName": "Chrome",
    	"browserVersion": "138",
    	"LT:Options": {
    		"username": "paulrajmail",
    		"accessKey": "LT_xozkF4UN07H5UNJ9cHsni7TvSwPmTEBbnTXMOZPsPICgsLi",
    		"visual": true,
    		"video": true,
    		"platformName": "Windows 10",
    		"project": "Untitled",
    		"w3c": true,
    		"plugin": "node_js-webdriverio"
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
    ui: "bdd",
    timeout: 50000,
  }
};
