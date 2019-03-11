user= process.env.LT_USERNAME || "<your username>",
key=  process.env.LT_ACCESS_KEY || "<your accessKey>",

exports.config = {

  updateJob: false,
  user,
  key,
  specs: [
    './tests/specs/single_test.js'
  ],
  exclude: [],

  maxInstances: 10,
  commonCapabilities: {
    // name: 'Parallel Sample Test',
    // build: 'WebDriver Selenium Sample'
  },

  capabilities: [
    {
    platfrom:"win10",
    browserName: 'chrome',
    version:"64.0",
  },{
    platform:"win10",
    browserName: 'firefox',
    version:"64.0",
  },
  {
    platform:"win10",
    browserName: 'internet explorer',
    version:"11.0",
  },

],

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

  beforeSession: function (config, capabilities, specs) {
    capabilities.name=specs[0].split(/(\\|\/)/g).pop() || undefined;
    },
    after: function (result, capabilities, specs) {
      driver.execute("lambda-status=".concat(result==0?"passed":"failed"),undefined);
    },

  framework: 'mocha',
  mochaOpts: {
      ui: 'bdd'
  }
}

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
