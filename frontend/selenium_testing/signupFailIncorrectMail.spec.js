// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Signup_Fail_Incorrect_Mail', function() {
  
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').usingServer('http://localhost:4444/wd/hub').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Signup_Fail_Incorrect_Mail', async function() {
    // Test name: Signup_Fail_Incorrect_Mail
    // Step # | name | target | value
    // 1 | open | /login | 
    await driver.get("http://3.90.66.68:3000/login")
    // 2 | setWindowSize | 1440x900 | 
    await driver.manage().window().setRect({ width: 1440, height: 900 })
    // 3 | click | id=sign-up-btn1 | 
    await driver.findElement(By.id("sign-up-btn1")).click()
    // 4 | click | css=.input-field:nth-child(2) > input | 
    await driver.findElement(By.css(".input-field:nth-child(2) > input")).click()
    // 5 | type | css=.input-field:nth-child(2) > input | Test
    await driver.findElement(By.css(".input-field:nth-child(2) > input")).sendKeys("Test")
    // 6 | type | css=.sign-up-form > .input-field:nth-child(3) > input | Tester
    await driver.findElement(By.css(".sign-up-form > .input-field:nth-child(3) > input")).sendKeys("Tester")
    // 7 | type | css=.sign-up-form > .input-field:nth-child(4) > input | wgwrg@vsrsv
    await driver.findElement(By.css(".sign-up-form > .input-field:nth-child(4) > input")).sendKeys("wgwrg@vsrsv")
    // 8 | click | css=.input-field:nth-child(5) > input | 
    await driver.findElement(By.css(".input-field:nth-child(5) > input")).click()
    // 9 | type | css=.input-field:nth-child(5) > input | 123456789
    await driver.findElement(By.css(".input-field:nth-child(5) > input")).sendKeys("123456789")
    // 10 | click | id=sign-up-btn | 
    await driver.findElement(By.id("sign-up-btn")).click()
    // 11 | mouseDownAt | css=.sign-up-form | 186,208.5
    {
      const element = await driver.findElement(By.css(".sign-up-form"))
      await driver.actions({ bridge: true }).moveToElement(element).clickAndHold().perform()
    }
    // 12 | mouseMoveAt | css=.sign-up-form | 186,208.5
    {
      const element = await driver.findElement(By.css(".sign-up-form"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 13 | mouseUpAt | css=.sign-up-form | 186,208.5
    {
      const element = await driver.findElement(By.css(".sign-up-form"))
      await driver.actions({ bridge: true }).moveToElement(element).release().perform()
    }
    // 14 | click | css=.sign-up-form | 
    await driver.findElement(By.css(".sign-up-form")).click()
    // 15 | type | css=.sign-up-form > .input-field:nth-child(4) > input | Test@gmail.com
    await driver.findElement(By.css(".sign-up-form > .input-field:nth-child(4) > input")).sendKeys("Test@gmail.com")
    // 16 | click | id=sign-up-btn | 
    await driver.findElement(By.id("sign-up-btn")).click()
    // 17 | mouseOver | id=sign-up-btn | 
    {
      const element = await driver.findElement(By.id("sign-up-btn"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 18 | mouseOut | id=sign-up-btn | 
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
  })
})
