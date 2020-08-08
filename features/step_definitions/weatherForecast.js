const { Given, When, Then} = require('cucumber');
const seleniumWebdriver = require('selenium-webdriver');
const assert = require('assert');
const By = seleniumWebdriver.By


Given(/^I launch the weather forecast page$/, async function () {
  await this.driver.get('http://localhost:3000/');
  console.log("Weather application is launched");
});


When(/^I enter the (.*)$/, async function (cityname) {
  let city = await this.driver.findElement(By.id('city'));
  city.clear();
  await city.sendKeys(cityname);
  console.log("City name is entered as "+cityname);
  await city.sendKeys(seleniumWebdriver.Key.ENTER);
});


Then(/^I should see the weather forecast data for five days$/, async function () {
  console.log("5 day weather forecast of the day is being displayed...");
  for (let i=1;i<=5;i++) {
    let selector = await this.driver.findElement(By.xpath("//*[@data-test='day-"+i+"']"));
    const visible = await selector.isDisplayed();
    assert.equal(visible,true, 'Element is not displayed on screen');
  }
});


Then(/^I should not see the weather forecast data for more than (.*) days$/, async function (expectedNumberOfDays) {
  const identifier = '//div[@data-reactroot]/div/div/span[1]/span[1]';
  let dayDetails = await this.driver.findElements(By.xpath(identifier));
  assert.equal(dayDetails.length, expectedNumberOfDays, "Weather forecast data is for more than "+expectedNumberOfDays+"  days");
});


When(/^I select (.*)$/, async function (val) {
  await this.driver.findElement(By.xpath("//*[@data-test='day-"+val+"']")).click();
  console.log("clicked on the day");
});


Then(/^I should be able to see 3 hourly forecast for that (.*)$/, async function (day) {
  var hoursarray = [];
  console.log("3 hourly forecast of the day is being displayed");
  let hoursForecastLocator = await this.driver.findElements(By.xpath('//span[contains(@data-test,"hour-'+day+'")]'));
  for (const hourLocator of hoursForecastLocator) {
     hoursarray.push(parseInt(await hourLocator.getAttribute('innerText')));
  }
  function absoluteDifference(arrayOfElements) {
      var result = 0;
      for (let i = 1; i < arrayOfElements.length; i++) {
          result = Math.abs(arrayOfElements[i] - arrayOfElements[i - 1]);
          assert.equal(result, 300, "Error: Hourly forecast isn't 3 hours apart");
      }
  }
  await absoluteDifference(hoursarray);
});


Then(/^I should not be able to see 3 hourly forecast for that day$/, async function () {
    await this.driver.sleep(2000);
    const selector = await this.driver.findElement(By.xpath("//div[@class='details']"));
    console.log('weather forecast should hide');
    const visible = await selector.isDisplayed();
    assert.equal(visible,false, 'Error: Able to see 3 hourly forecast');
});


Then(/^I should see the summarized view of current weather condition of the (.*)$/,async function (day) {
    var dailyWeather = [];
    let weatherSummaryLocator = await this.driver.findElement(By.xpath('//*[@data-test="description-'+day+'"]'));
    let expectedWeatherSummary = await weatherSummaryLocator.getAttribute('aria-label');
    console.log(expectedWeatherSummary);

    let dailyWeatherLocator = await this.driver.findElements(By.xpath('//*[contains(@data-test,"description-'+day+'-")]'));
    for (const weather of dailyWeatherLocator) {
        dailyWeather.push(await weather.getAttribute('aria-label'))
    }

    function mode(arr){
        return arr.sort((a,b) =>
            arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop();
    }
    const actualWeatherSummary = mode(dailyWeather);
    console.log(actualWeatherSummary);
    assert.equal(actualWeatherSummary, expectedWeatherSummary, 'Error: Actual weather summary is not as expected');
});


Then(/^I should see the current wind speed of the (.*)$/, async function (day) {
    var dailyWindSpeed = [];

    let windSpeedLocator = await this.driver.findElement(By.xpath('//*[@data-test="speed-'+day+'"]'));
    let expectedWindSpeed = await windSpeedLocator.getAttribute('innerText');
    console.log(expectedWindSpeed);

    let dailyWindSpeedLocator = await this.driver.findElements(By.xpath('//*[contains(@data-test,"speed-'+day+'-")]'));
    for (const windSpeed of dailyWindSpeedLocator) {
        dailyWindSpeed.push(await windSpeed.getAttribute('innerText'))
    }
    function mode(arr){
        return arr.sort((a,b) =>
            arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop();
    }
    const actualWindSpeed = mode(dailyWindSpeed);
    console.log(actualWindSpeed);
    assert.equal(actualWindSpeed, expectedWindSpeed, 'Error: Actual Wind speed is not as expected');
});


Then(/^I should see the summarized view of Aggregate rainfall of the (.*)$/, async function (day) {
    var rainValues = [];
    let rainfallLocator = await this.driver.findElement(By.xpath('//*[@data-test="rainfall-'+day+'"]'));
    let expectedRainfall = await rainfallLocator.getAttribute('innerText');
    console.log(expectedRainfall);

    let dailyRainfallLocator = await this.driver.findElements(By.xpath('//*[contains(@data-test,"rainfall-'+day+'-")]'));
    for (const rainfall of dailyRainfallLocator) {
        rainValues.push(parseInt(await rainfall.getAttribute('innerText')))
    }

    const actualRainfall = rainValues.reduce(function(a, b) { return a + b; }, 0) + 'mm';
    console.log(actualRainfall);
    assert.equal(actualRainfall, expectedRainfall, 'Error: Actual rainfall is not as expected');
});


Then(/^I should see the minimum and maximum temperature of the (.*)$/, async function (day) {
    var minimumTemperature = [];
    var maximumTemperature = [];
    let minimumTemperatureLocator = await this.driver.findElement(By.xpath('//*[@data-test="minimum-'+day+'"]'));
    let expectedMinimumTemperature = parseInt(await minimumTemperatureLocator.getAttribute('innerText'));
    console.log(expectedMinimumTemperature);

    let maximumTemperatureLocator = await this.driver.findElement(By.xpath('//*[@data-test="maximum-'+day+'"]'));
    let expectedMaximumTemperature = parseInt(await maximumTemperatureLocator.getAttribute('innerText'));
    console.log(expectedMaximumTemperature);

    let dailyMinTempLocator = await this.driver.findElements(By.xpath('//*[contains(@data-test,"minimum-'+day+'-")]'));
    for (const minTemp of dailyMinTempLocator) {
        minimumTemperature.push(parseInt(await minTemp.getAttribute('innerText')));
    }

    let dailyMaxTempLocator = await this.driver.findElements(By.xpath('//*[contains(@data-test,"maximum-'+day+'-")]'));
    for (const maxTemp of dailyMaxTempLocator) {
        maximumTemperature.push(parseInt(await maxTemp.getAttribute('innerText')));
    }

    const actualMinimumTemperature = Math.min.apply(null, minimumTemperature);
    const actualMaximumTemperature = Math.max.apply(null, minimumTemperature);
    console.log(actualMinimumTemperature);
    console.log(actualMaximumTemperature)
    assert.equal(actualMinimumTemperature, expectedMinimumTemperature, 'Error: Actual minimum temperature is not as expected');
    assert.equal(actualMaximumTemperature, expectedMaximumTemperature, 'Error: Actual maximum temperature is not as expected');
});


Then(/^I should be able to see all values are rounded off$/, async function () {

    for (let i=1;i<=5;i++){
        const identifier = '//span[@data-test="maximum-'+i+'"]';
        let temperatureLocator = await this.driver.findElement(By.xpath(identifier));
        let temperature = parseInt(await temperatureLocator.getAttribute('innerText'));
        console.log('Temperature value: ' + temperature);
        assert.equal(temperature, Math.round(temperature), 'Error: Temperature is not a round off value');
    }

    for (let i=1;i<=5;i++){
        const identifier = '//span[@data-test="speed-'+i+'"]';
        let speedLocator = await this.driver.findElement(By.xpath(identifier));
        let speed = parseInt(await speedLocator.getAttribute('innerText'));
        console.log('Speed value: ' + speed);
        assert.equal(speed, Math.round(speed), 'Error: Speed is not a round off value');
    }

    for (let i=1;i<=5;i++){
        const identifier = '//span[@data-test="rainfall-'+i+'"]';
        let rainfallLocator = await this.driver.findElement(By.xpath(identifier));
        let rainfall = parseInt(await rainfallLocator.getAttribute('innerText'));
        console.log('Rainfall value: ' + rainfall);
        assert.equal(rainfall, Math.round(rainfall), 'Error: Rainfall is not a round off value');
    }

});


Then(/^I should see the error message as (.*)$/, async function (value) {
  //this.driver.sleep(5000);
  let selector = await this.driver.findElement(By.xpath("//div[text()='"+value+"']"));
  const message = await selector.isDisplayed();
  assert.equal(message,true,'There is no error message');

});

