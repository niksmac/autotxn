# autotxn

Automated Smart contract transactions

## Install

- Run `nvm use`
- Copy `cp .env.example .env` and fill in values
- Run `yarn` or `npm install`
- Run `node server.js` or nodeomon, pm2 as you please.

## Files

- [Schema](schema.md)
- [Sale.sol](contracts/Sale.sol)

### Routes

#### - /order:

- method: POST
- parameters: id, purchaseAmount, merchantID, dateTimeofPurchase, paymentAmount, customerID, tems
- place orders

### - /orders

- method: GET
- parameters: {id}
- returns order details for a given order id

### - /customers

- method: POST
- parameters: firstName, lastName, birthdate, customerID, gender
- add customers

### - /customers

- method: GET
- parameters: {id}
- returns customer details for a given customerID

### - /merchant

- method: POST
- parameters: name, merchantID, visa, salesPerson, bonusPayment
- add merchants

### - /merchant

- method: GET
- parameters: {id}
- returns merchant details for a given merchantID
