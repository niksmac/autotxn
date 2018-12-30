("use strict");

require("dotenv").config();

const Web3 = require("web3");
const contract = require("truffle-contract");
const Ecommerce = require(process.cwd() + "/build/contracts/Ecommerce.json");

if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3));
}

const instance = () => {
  const CDP = contract(Ecommerce);
  CDP.setProvider(web3.currentProvider);
  fixTruffleContractCompatibilityIssue(CDP);
  return CDP.at(process.env.CONTRACT_ADDRESS);
};

const addOrder = data => {
  var cdp = instance();
  return cdp.addOrder(
    data.id,
    data.purchaseAmount,
    data.merchantID,
    data.dateTimeofPurchase,
    data.paymentAmount,
    data.customerID,
    data.items,
    {
      from: process.env.FROM_ADDRESS,
      gas: 210000
    }
  );
};

const getOrder = id => {
  var cdp = instance();
  return cdp.getOrder(id);
};

const addCustomer = data => {
  var cdp = instance();
  console.log(data);
  return cdp.addCustomer(
    data.firstName,
    data.lastName,
    data.birthdate,
    data.customerID,
    data.gender,
    {
      from: process.env.FROM_ADDRESS,
      gas: 210000
    }
  );
};

const getCustomer = id => {
  var cdp = instance();
  return cdp.getCustomer(id);
};

const addMerchant = data => {
  var cdp = instance();
  return cdp.addMerchant(
    data.name,
    data.merchantID,
    data.visa,
    data.salesPerson,
    data.bonusPayment,
    {
      from: process.env.FROM_ADDRESS,
      gas: 210000
    }
  );
};

const getMerchant = id => {
  var cdp = instance();
  return cdp.getMerchant(id);
};

const fixTruffleContractCompatibilityIssue = contract => {
  if (typeof contract.currentProvider.sendAsync !== "function") {
    contract.currentProvider.sendAsync = function() {
      return contract.currentProvider.send.apply(
        contract.currentProvider,
        arguments
      );
    };
  }
  return contract;
};

exports.addOrder = addOrder;
exports.getOrder = getOrder;
exports.addCustomer = addCustomer;
exports.getCustomer = getCustomer;
exports.addMerchant = addMerchant;
exports.getMerchant = getMerchant;
