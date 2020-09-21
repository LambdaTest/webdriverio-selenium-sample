# WebdriverIO Tutorial
[WebdriverIO 5.6.2](http://webdriver.io/) Integration with LambdaTest

![LambdaTest Logo](https://www.lambdatest.com/images/logo.svg)

<img src = "https://miro.medium.com/max/2488/1*2ntKtVBowGdACso6Gcmy1A.jpeg" height = "400">

WebdriverIO is a custom implementation for selenium's W3C webdriver API. It is written in Javascript and packaged into 'npm' and runs on Node.js.

## Prerequisites for  WebdriverIO 

1. Download Visual Studio (IDE) for your operating system.
2. **Node.js and Package Manager (npm) :** Install Node.js from their [official website](https://nodejs.org/en/download/) Or Install Node.js using command line. Go to the terminal or command prompt & run the below command.

`$   install node`

To verify the node version 

` $  node -v `

If node isn’t of the latest version then you can update it using the below command.

`$ npm install npm@latest -g`

3. Install Selenium Dependencies

`npm install selenium-webdriver `

 4. **LambdaTest Authentication Credentials:** Make sure you have your LambdaTest credentials with you to run test automation scripts with Jest on LambdaTest Selenium Grid. You can obtain these credentials from the [LambdaTest Automation Dashboard](https://automation.lambdatest.com/) or through [LambdaTest Profile](https://accounts.lambdatest.com/detail/profile).

Set LambdaTest Username and Access Key in environment variables.

* For Linux/macOS:
`export LT_USERNAME="YOUR_USERNAME"
export LT_ACCESS_KEY="YOUR ACCESS KEY"`

* For Windows:
`set LT_USERNAME="YOUR_USERNAME"
set LT_ACCESS_KEY="YOUR ACCESS KEY"`

5. Ensure that you have Webdriverio installed in your system, you can install it using the below command through npm. 	

`$ npm install webdriverio`

## Setting Up The Project In Visual Studio IDE

**Step 1 :** After installation of the Visual Studio IDE, create a folder in your local system to save all the projects.

**Step 2 :** Install the below extensions for JavaScript from ‘Extensions’ in VScode Editor.  
* Code Runner 
* JavaScript( ES6) code snippet
* ES Lint

**Step 3 :** Press ‘Ctrl+Shift+P’ and search for git:clone. Paste the URL of this repository[https://github.com/LambdaTest/webdriverio-selenium-sample.git](https://github.com/LambdaTest/webdriverio-selenium-sample.git) to clone.

**Step 4 :** Press ENTER and save the WebdriverIO project in the above created folder.

**Step 5:** Create a project directory named [webdriverio-selenium-sample](https://github.com/LambdaTest/webdriverio-selenium-sample)  directory in the VS code (IDE).

**Step 6:** Initialize your project by hitting the command npm init. This will create a package.json file in an interactive way, which will contain all our required project configurations. It will be required to execute our test script. Here is that package.json.


```

{




 "name": "webdriverio-Lambdatest",


 "version": "0.1.0",


 "readme": "WendriverIO Integration with [Lambdatest](https://www.Lambdatest.com)",


 "description": "Selenium examples for WebdriverIO and Lambdatest Automate",


 "scripts": {


   "test": "npm run single && npm run local && npm run parallel",


   "single": "./node_modules/.bin/wdio conf/single.conf.js",


   "parallel": "./node_modules/.bin/wdio conf/parallel.conf.js",


   "local": "./node_modules/.bin/wdio conf/local.conf.js",


   "multiple": "./node_modules/.bin/wdio conf/multiple.conf.js"


 },


 "repository": {


   "type": "git",


   "url": "git+https://github.com/Lambdatest/webdriverio-Lambdatest.git"


 },


 "keywords": [


   "webdriverio",


   "Lambdatest",


   "selenium",


   "tests"


 ],


 "bugs": {},


 "homepage": "https://github.com/Lambdatest/webdriverio-Lambdatest#readme",


 "dependencies": {


   "webdriverio": "^4.14.2"


 },


 "devDependencies": {


   "wdio-mocha-framework": "^0.6.4"


 }


}

```


**Note:**  In case, you’re importing the sample, you would need to give the below command to install all dependencies mentioned in the package.json file in the sample code.


`$ npm i or $ npm install`

## Executing First Webdriverio Test Script


### Test Scenario

The test script will do the following actions:
1. Invoke the browser launch.
2. Go to www.google.com. 
3. Type test123 in the search box.
4. Fetch the title of the web page.
5. Close the browser and display the fetched title in the console.

That’s it. Before we deep dive into the test script, we need to declare our desired capabilities. These desired capabilities will help us define the testing environment such as browser version, operating system, and more. You can leverage [LambdaTest Desired Capabilities Generator](https://www.lambdatest.com/capabilities-generator/) to specify the desired capabilities class.

### [LambdaTest Desired Capabilities Generator](https://www.lambdatest.com/capabilities-generator/) 

Let us fetch the desired capabilities class from the **LambdaTest Desired Capabilities Generator** to run the script on LambdaTest cloud-based Selenium Grid.

![capability-generator](https://www.lambdatest.com/blog/wp-content/uploads/2020/05/pasted-image-0.png)

With the capability generator, you can specify a variety of configurations in multiple programming languages.

### Test Scripts For Running WebdriverIO Test On A Single Configuration

We’ll create a JavaScript file [single_test.js](https://github.com/LambdaTest/webdriverio-selenium-sample/blob/master/tests/specs/single_test.js) for running the test script using WebdriverIO, as per the test scenario. 

```

const assert = require('assert');
 
describe('Google Search Function', () => {
  it('can find search results', () => {
    browser.url('https://www.google.com/ncr');
    const input = $('[name="q"]');
    input.setValue('test123');
 
    const title = browser.getTitle();
    assert.equal(title, 'Google');
  });
});

```

**Create configuration file:**

To run the script, we would also need a configuration file to provide the capabilities, which can be generated using the capabilities generator. The configuration file will also contain the credentials of user i.e username and access key and the Hub URL. In case, the script requires tunnel connection, we can set the **tunnel: true** in the **services**. This will automatically download the tunnel binary to the project, start it before test execution and close after the test is executed.

Below is the snippet of the configuration file for single_test.js named by single.conf.js in the conf folder.

```JavaScript
exports.config = {
  services: [
    [
      "lambdatest",
      {
        tunnel: true,
        lambdatestOpts: {
          logFile: "tunnel.log"
        }
      }
    ]
  ],
  user: 'Your_LambdaTest_Username',
  key: 'Your_LambdaTest_Access_Key',
  specs: ["./tests/specs/single_test.js"],
  exclude: [],
 
  capabilities: [
    {
      browserName: "chrome",
      version: "64.0",
      name: "Test webdriverio",
      build: "build 1",
      network: false,
      video: true,
      visual: false,
      console: false
    }
  ],
  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
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
```
If you notice the package.json, you will find required dependencies added for the single.conf.js.

## Running The First WebdriverIO Test Script

Open terminal or command prompt in the project directory where you cloned [GitHub repository for WebdriverIO](https://github.com/LambdaTest/webdriverio-selenium-sample), then run the below command to execute your first WebdriverIO test script on LambdaTest Selenium Grid. As per our declared capabilities, this test should run over Google Chrome 64.

`npm run single`

The above command is defined in the package.json file, and can be provided with any name as per the user’s convenience. Following is the snippet of the same:

```
"scripts": {
    "test": "npm run single,
     single": "./node_modules/.bin/wdio conf/single.conf.js"
}

```

Once you run the command, you can notice whether the test passed or failed which can over LambdaTest Automation Dashboard. In the below snapshot, we can see the test got passed.

![](https://www.lambdatest.com/blog/wp-content/uploads/2020/05/automation-testing.png)

Also , if you look at your **Output Console**, you will find the **title of the web page**.

![](https://www.lambdatest.com/blog/wp-content/uploads/2020/05/testing-script.png)

## Testing Locally Hosted Web-Applications

In case, the script requires tunnel connection, we can set the **tunnel: true** in the **services**. This will automatically download the tunnel binary to the project, start it before test execution and close after the test is executed. We did this in single conf.js if you didn’t notice.

```javascript
exports.config = {
  services: [
    [
      "lambdatest",
      {
        tunnel: true,
        lambdatestOpts: {
          logFile: "tunnel.log"
        }
      }
    ]
  ]

```

* Set **tunnel = true**
* Set **tunnelName** = '**Identifier name**'  (recommended as a tunnel identifier  in case of  more than 1 tunnels being connected)

**Curious to know more about Lambda Tunnel To Test Locally Hosted Pages?**

Refer to our support documentation for more information on [Lambda Tunnel](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/). 

### Want To Run Lambda Tunnel Without Using Command Line?

Download the **Underpass** app for your operating system. Refer to our support documentation for more information on [Lambda Underpass-tunnel-app](https://www.lambdatest.com/support/docs/underpass-tunnel-application/)

## Parallel Execution

Webdriverio does support parallel execution of code, i.e. execution of same code simultaneously on multiple browsers/device combinations which not only saves efforts to test the code, but also reduces the total execution time of tests.

To perform parallel execution of the above WebdriverIO test script over LambdaTest [Selenium Grid](https://www.lambdatest.com/selenium-automation), you would only need to modify the configuration file with multiple capabilities. Following is the snippet for the same. You can find this file as [parallel.conf.js](https://github.com/LambdaTest/webdriverio-selenium-sample/blob/master/conf/parallel.conf.js).

```javascript
exports.config = {
  services: [
    [
      "lambdatest",
      {
        tunnel: true,
        lambdatestOpts: {
          logFile: "tunnel.log"
        }
      }
    ]
  ],
  user: 'Your_LambdaTest_Username',
  key: 'Your_LambdaTest_Access_Key',
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
      platform: "win10",
      browserName: "chrome",
      version: "64.0"
    },
    {
      platform: "win10",
      browserName: "firefox",
      version: "64.0"
    },
    {
      platform: "win10",
      browserName: "internet explorer",
      version: "11.0"
    }
  ],
 
  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  path: "/wd/hub",
  hostname: "hub.lambdatest.com",
  port: 80,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd"
  }
};
 
// Code to support common capabilities
exports.config.capabilities.forEach(function(caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
});

```
In the above code, we have provided multiple capabilities to execute the same code on **Google Chrome 64**, **Mozilla Firefox 64** and **IE 11** **simultaneously** on **Windows 10**. 
Note: To run parallel test, we also defined separate command: **npm run parallel** in our package.json file, like below:


```javascript
"scripts": {
    "test": "npm run single && npm run parallel",
    "single": "./node_modules/.bin/wdio conf/single.conf.js",
    "parallel": "./node_modules/.bin/wdio conf/parallel.conf.js",
 }
```

So, the above script will run on different browsers simultaneously with the below command as defined above in the package.json file.

`npm run parallel`

Below is the screenshot for the parallel test execution in the [LambdaTest Automation Dashboard](https://automation.lambdatest.com/).

![](https://www.lambdatest.com/blog/wp-content/uploads/2020/05/seleniumwebdriverIO.png)


## About LambdaTest

[LambdaTest](https://www.lambdatest.com/) is a cloud based selenium grid infrastructure that can help you run automated cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD platforms. It's a perfect solution to bring your [selenium automation testing](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut down your test execution time by running tests on parallel.


## Resources
### [SeleniumHQ Documentation](http://www.seleniumhq.org/docs/)
### [WebdriverIO Documentation](https://webdriver.io/docs/gettingstarted.html)
