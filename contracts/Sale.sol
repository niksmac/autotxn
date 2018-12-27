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
  function addOrder(
      uint id,
      uint purchaseAmount,
      string memory merchantID,
      uint256 dateTimeofPurchase,
      uint paymentAmount,
      uint customerID,
      string memory items) public returns(bool success) {
    orders[id].customerID = customerID;
    orders[id].merchantID = merchantID;
    orders[id].purchaseAmount = purchaseAmount;
    orders[id].dateTimeofPurchase = dateTimeofPurchase;
    orders[id].paymentAmount = paymentAmount;
    orders[id].items = items;
    return true;
   }

  function getOrder(uint id) public view returns(uint purchaseAmount,
      string memory merchantID,
      uint256 dateTimeofPurchase,
      uint paymentAmount,
      uint customerID,
      string memory items) {
    return(orders[id].purchaseAmount,
    orders[id].merchantID,
    orders[id].customerID,
    orders[id].dateTimeofPurchase,
    orders[id].paymentAmount,
    orders[id].items);
  }

  function addCustomer(string memory firstName,
    string memory lastName,
    uint256 birthdate,
    uint customerID,
    bytes8 gender) public returns(bool success){
    customers[customerID].firstName = firstName;
    customers[customerID].lastName = lastName;
    customers[customerID].birthdate = birthdate;
    customers[customerID].customerID = customerID;
    customers[customerID].gender = gender;
    return true;
  }

  function getCustomer(uint id) public view returns(string memory firstName,
    string memory lastName,
    uint256 birthdate,
    uint customerID,
    bytes8 gender) {
      return(customers[id].firstName,
      customers[id].lastName,
      customers[id].birthdate,
      customers[id].customerID,
      customers[id].gender);
    }

  function addMerchant(string memory name,
    string memory merchantID,
    string memory visa,
    string memory salesPerson,
    uint bonusPayment) public returns(bool success){
      merchants[merchantID].name = name;
      merchants[merchantID].merchantID = merchantID;
      merchants[merchantID].visa = visa;
      merchants[merchantID].salesPerson = salesPerson;
      merchants[merchantID].bonusPayment = bonusPayment;
      return true;
  }

  function getMerchant(string memory id) public view returns(string memory name,
    string memory merchantID,
    string memory visa,
    string memory salesPerson,
    uint bonusPayment) {
      return(merchants[id].name,
      merchants[id].merchantID,
      merchants[id].visa,
      merchants[id].salesPerson,
      merchants[id].bonusPayment);
    }
}
