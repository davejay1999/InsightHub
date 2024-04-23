// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Get_User_Detail', function() {
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
  it('Get_User_Detail', async function() {
    // Test name: Get_User_Detail
    // Step # | name | target | value
    // 1 | open | /login | 
    await driver.get("http://3.90.66.68:3000/login")
    // 2 | setWindowSize | 1440x900 | 
    await driver.manage().window().setRect({ width: 1440, height: 900 })
    // 3 | click | css=.sign-in-form > .input-field:nth-child(3) > input | 
    await driver.findElement(By.css(".sign-in-form > .input-field:nth-child(3) > input")).click()
    // 4 | click | css=.sign-in-form > .input-field:nth-child(3) > input | 
    await driver.findElement(By.css(".sign-in-form > .input-field:nth-child(3) > input")).click()
    // 5 | type | css=.sign-in-form > .input-field:nth-child(3) > input | test2@gmail.com
    await driver.findElement(By.css(".sign-in-form > .input-field:nth-child(3) > input")).sendKeys("test2@gmail.com")
    // 6 | click | css=.sign-in-form > .input-field:nth-child(4) > input | 
    await driver.findElement(By.css(".sign-in-form > .input-field:nth-child(4) > input")).click()
    // 7 | type | css=.sign-in-form > .input-field:nth-child(4) > input | Test@123
    await driver.findElement(By.css(".sign-in-form > .input-field:nth-child(4) > input")).sendKeys("Test@123")
    // 8 | click | id=sign-in-btn | 
    await driver.findElement(By.id("sign-in-btn")).click()
    // 9 | click | id=getUserDetails | 
    await driver.findElement(By.id("getUserDetails")).click()
    // 10 | click | css=.btn:nth-child(4) | 
    await driver.findElement(By.css(".btn:nth-child(4)")).click()
    // 11 | click | id=getUserDetails | 
    await driver.findElement(By.id("getUserDetails")).click()
    // 12 | click | id=logoutButton | 
    await driver.findElement(By.id("logoutButton")).click()
  })
})
