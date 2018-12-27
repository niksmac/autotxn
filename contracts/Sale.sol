pragma solidity >=0.4.22 <0.6.0;

contract Sale {

  struct Customer {
      string firstName;
      string lastName;
      uint256 birthdate;
      uint customerID;
      bytes8 gender;
  }
  struct Merchant {
      string name;
      string merchantID;
      string visa;
      string salesPerson;
      uint bonusPayment;
  }

  struct Order {
      uint customerID;
      string merchantID;
      uint purchaseAmount;
      uint256 dateTimeofPurchase;
      uint paymentAmount;
      string items;
  }

  mapping(string => Merchant) merchants;
  mapping(uint => Customer) customers;
  mapping(uint => Order) orders;
}
