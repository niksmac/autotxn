# Schema

**This is a high level `pseudocode` documentation for the contract state structure.**

## Sale

```
merchant: '$ref/merchant'
customer: '$ref/customer'
items: '$ref/item'
```

## Merchant

```
name: string
id: string
visa: string
salesPerson: string
```

## Customer

```
customerId: string
firstName: string
lastName: string
dateofBirth: string
gender: string
purchaseAmount: uint
dateTimeofPurchase: string
items: bytes32
```

## Item

```
name: string
sku: string
```
