# Schema

**This is a high level `pseudocode` documentation for the contract state structure.**

## Order

```
merchant: '$ref/merchant'
customer: '$ref/customer'
purchaseAmount: decimal
dateTimeofPurchase: string
paymentAmount: decimal
items: array
```

## Merchant

```
name: string
id: string
visa: string
salesPerson: string
bonusPayment: decimal
```

## Customer

```
customerId: string
firstName: string
lastName: string
dateofBirth: string
gender: string
```

## Item

```
name: string
sku: string
```
