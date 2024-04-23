// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Login_Fail_Incorrect_Password', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').usingServer('http://localhost:4444/wd/hub').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Login_Fail_Incorrect_Password', async function() {
    // Test name: Login_Fail_Incorrect_Password
    // Step # | name | target | value
    // 1 | open | /login | 
    await driver.get("http://3.90.66.68:3000/login")
    // 2 | setWindowSize | 1440x900 | 
    await driver.manage().window().setRect({ width: 1440, height: 900 })
    // 3 | click | css=.sign-in-form > .input-field:nth-child(3) > input | 
    await driver.findElement(By.css(".sign-in-form > .input-field:nth-child(3) > input")).click()
    // 4 | type | css=.sign-in-form > .input-field:nth-child(3) > input | test3@gmail.com
    await driver.findElement(By.css(".sign-in-form > .input-field:nth-child(3) > input")).sendKeys("test3@gmail.com")
    // 5 | type | css=.sign-in-form > .input-field:nth-child(4) > input | Test@1234
    await driver.findElement(By.css(".sign-in-form > .input-field:nth-child(4) > input")).sendKeys("Test@1234")
    // 6 | click | id=sign-in-btn | 
    await driver.findElement(By.id("sign-in-btn")).click()
  })
})
