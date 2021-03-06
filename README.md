## **About**
This repo contains the backend service of our master's project. The backend services contains notification functionalities related to Home Automation Unit.

## **Software Stack**
The software stack for our application includes following technologies:

1. **Server**: Node.js, Express

2. **Database**: MongoDB

3. **SMS Notification**: Twilio

## **Instruction**
1. Install Node.js.
2. Install MongoDB.
3. Create your twilio account at https://www.twilio.com/login
4. Run npm install to download the required packages from npm repository.
5. Start MongoDB server.
6. Set up environment variables TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_NUMBER.
7. Run `node server.js` to start the nodejs application.

## **Ongoing**
Add **RabbitMQ** to the project architecture.This queue will fetch all the incoming request and it will be processed by other nodejs server to execute functionality.

