user= process.env.LT_USERNAME || "<your username>",
key= process.env.LT_ACCESS_KEY || "<your accessKey>",

exports.config = {

  updateJob: false,
  user,
  key,
  specs: [
    './tests/specs/single_test.js'
  ],
  exclude: [],

  capabilities: [{
    browserName: 'chrome',
    version:"64.0",
    name:"Test webdriverio",
    build:"build 1",
    network: false,
    video: true,
    visual: true,
    console: true,
    tunnel:false
  }],
  sync: true,
  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 100000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 1,
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
