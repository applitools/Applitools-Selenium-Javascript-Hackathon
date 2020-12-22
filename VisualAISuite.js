require('chromedriver');
const { beforeEach, before, describe, it, after, afterEach } = require('mocha');
const { Builder, By}  = require("selenium-webdriver");
const { Eyes, Target, Configuration, BatchInfo, ClassicRunner, RectangleSize  } = require('@applitools/eyes-selenium');
const originalAppURL = "https://demo.applitools.com/hackathon.html";
const newAppURL = "https://demo.applitools.com/hackathonV2.html";

describe('Visual Tests', async function() {
    let driver;
    before( async () => {
        // Initialize BatchInfo
        batchInfo =  new BatchInfo("VisualAITests");
        //I nitialize the Runner
        runner = new ClassicRunner();
        
    })
    beforeEach( async function() {
        driver = await new Builder()
        .forBrowser('chrome')
        .build();
        if(process.env.IsOriginalAppUrl==='true'){
            await driver.get(originalAppURL);
        }
        else{
            await driver.get(newAppURL);
        }

        // Initialize the eyes SDK
        eyes = new Eyes(runner);

        // Initialize the eyes configuration
        let conf = new Configuration();
        
        conf.setBatch(batchInfo);
        
        //          conf.setApiKey("SE_YOUR_API_KEY");
        //          conf.setServerUrl("SET_YOUR_DEDICATED_CLOUD_URL")

        // set the configuration to eyes
        eyes.setConfiguration(conf);
        //eyes.setLogHandler(new StdoutLogHandler(true));

        // Initialize a test session
        await eyes.open(driver, "Visual Tests", this.currentTest.title, new RectangleSize(800,600));
    })

    it('Page View', async () => {
        // Add visual here replacing all 21 assertions in the following tests:
            // validateLabels
            // validateImages
            // validateCheckBox
        
    })

    it('Username and password not present', async () => {
        // submit the form
        await driver.findElement(By.css("#log-in")).click();
        // Add visual validation here
    })

    it('Username must be present', async () => {
        await driver.findElement(By.css('#username')).sendKeys("John Smith")
        // submit the form
        await driver.findElement(By.css("#log-in")).click();
        // Add visual validation here
    })
    
    it('Password must be present', async () => {
        await driver.findElement(By.css('#password')).sendKeys("ABC$1@");
        // submit the form
        await driver.findElement(By.css("#log-in")).click();
        // Add visual validation here
    })

    it('Successful Login', async () => {
        await driver.findElement(By.css('#username')).sendKeys("John Smith");
        await driver.findElement(By.css('#password')).sendKeys("ABC$1@");
        // submit the form
        await driver.findElement(By.css("#log-in")).click();
        // Add visual validation here
    })

    afterEach(async function() {

        try {
            // close the browser
            await driver.quit();
            // end the eyes test
            await eyes.closeAsync();
        } finally {
            // if tests were aborted before eyes.closeAsync() was called, this ends the test as aborted, if the test had been successfuly closed, this has no effect
            await eyes.abortAsync()
        }
        
    })
    after(async function() {
       
        // pass false to suppress the exception that is thrown
        const allTestResults = await runner.getAllTestResults(false);
        console.log(allTestResults);
    })
    
})