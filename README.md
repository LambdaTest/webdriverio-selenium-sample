# webdriverio-lambdatest-sample
[WebdriverIO](http://webdriver.io/) Integration with LambdaTest

![LambdaTest Logo](https://www.lambdatest.com/images/logo.svg)

<img src = "http://webdriver.io/images/webdriverio.png" height = "100">

## Setup
* Clone the repo
* Install dependencies `npm install`
* Update `*.conf.js` files inside the `conf/` directory with your LambdaTest Username and Access Key

## Running your tests
- To run a single test, run `npm run single`
- To run local tests, run `npm run local`
- To run parallel tests, run `npm run parallel`

 Know how many concurrent sessions needed by using our [Concurrency Test Calculator](https://www.lambdatest.com/concurrency-calculator?ref=github)

## Notes
* You can view your test results on the [LambdaTest Automation Dashboard](https://www.automation.lambdatest.com)
* To test on a different set of browsers, check out our [capabilities generator](https://www.lambdatest.com/capabilities-generator)
* You can export the environment variables for the Username and Access Key of your BrowserStack account

  ```
  export LT_USERNAME=<your username> &&
  export LT_ACCESS_KEY=<your access key>
  ```
