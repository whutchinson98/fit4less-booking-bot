'use strict';
const chromium = require('chrome-aws-lambda');
require('dotenv').config();

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
    message: result
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
    
    page.click('#emailaddress');
    page.type('input[name=emailaddress]', )
    page.click('#password')
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