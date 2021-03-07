# fit4less-booking-bot
The fit4less booking bot is an Aws Lambda function that uses the
[chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda "chrome-aws-lambda") node package. This bot goes into fit4less and books the most recent slot for the newest day that appointments are available.

## Setup
- This uses serverless to deploy the lambda function to AWS and create an API trigger by default. Other triggers can be added in the `serverless.yml` file as you wish.

- Once you have deployed via serverless you need to add in the environment variables `FIT4LESS_EMAIL`,`FIT4LESS_PASSWORD`,`FIT4LESS_TIMESLOT` and `FIT4LESS_DAYSLOT` to the AWS Lambda function.




## Installation / Deployment
##### This assumes that you have correctly installed and provided `serverless` with valid aws credentials

1. `npm install`
2. `serverless deploy`
