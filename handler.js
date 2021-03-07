'use strict';
require('dotenv').config();
const chromium = require('chrome-aws-lambda');

const email = process.env.FIT4LESS_EMAIL;
const password = process.env.FIT4LESS_PASSWORD;
const timeSlot = process.env.FIT4LESS_TIMESLOT;
const daySlot = process.env.FIT4LESS_DAYSLOT;

const latestDateSelector = `div[id="modal_dates"] > div > div > div[class="modal-body"] > div > div:nth-child(${daySlot})`;
const mostRecentTimeSlotAvailable = `div[class="time-slot"]:nth-child(${timeSlot})`;
const confirmSelection = 'button[id="dialog_book_yes"]';

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
    await page.$eval('#emailaddress', (el, email) => {el.value = email}, email);

    await page.$eval('#password', (el, password) => {el.value = password}, password);
    
    //Login
    await page.click('div[id=loginButton]');

    await page.waitForSelector('div[id=btn_date_select]', {visible: true});

    //Select day button
    await page.click('div[id=btn_date_select]');
   
    //Go to newest day
    await page.click(latestDateSelector);

    //Select earliest time
    await page.click(mostRecentTimeSlotAvailable);

    //Confirm
    await page.click(confirmSelection);

    result = "Booking confirmed";
    
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