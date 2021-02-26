'use strict';
require('dotenv').config();
const chromium = require('chrome-aws-lambda');
const latestDateSelector = 'div[id="modal_dates"] > div > div > div[class="modal-body"] > div > div:nth-child(3)';

module.exports.browserTest = async (event, context, callback) => {
  let result = null;
  let browser = null;
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: result
    }),
  };

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    let page = await browser.newPage();
    await page.goto('https://example.com');
    result = await page.title();
  } catch (error) {

    response.statusCode = 400;

    response.body = JSON.stringify({
      message: error,
      input: event
    });

    return callback(null, response);

  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  response.body = JSON.stringify({
    message: process.env.FIT4LESS_EMAIL
  });

  return callback(null, response);

};

module.exports.bookGymTime = async (event, context, callback) => {
  let result = null;
  let browser = null;
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: result
    }),
  };

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    let page = await browser.newPage();
    await page.goto('https://myfit4less.gymmanager.com/portal/login.asp');
    
    //Enter email and password
    await page.click('#emailaddress');
    await page.type('input[name=emailaddress]', process.env.FIT4LESS_EMAIL, {delay: 20});

    await page.click('#password');
    await page.type('input[name=password]', process.env.FIT4LESS_PASSWORD, {delay: 20});

    //Login
    await page.click('div[id=loginButton]');

    await page.waitForSelector('div[id=btn_date_select]', {visible: true});

    //Select day button
    await page.click('div[id=btn_date_select]');

    //Go to newest day
    await page.click(latestDateSelector)

    //Select earliest time

    //Confirm
  } catch (error) {

    response.statusCode = 400;

    response.body = JSON.stringify({
      message: error,
      input: event
    });

    return callback(null, response);

  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  response.body = JSON.stringify({
    message: result
  });

  return callback(null, response);
}