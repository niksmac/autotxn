"use strict";
require("dotenv").load();
const Hapi = require("hapi");
const Store = require("data-store");
const cron = require("node-cron");

const store = new Store({ path: "config.json" });
const server = Hapi.server({
  host: "localhost",
  port: 8000
});

const {
  addOrder,
  getOrder,
  addCustomer,
  getCustomer,
  addMerchant,
  getMerchant
} = require("./util");

server.route({
  method: "GET",
  path: "/",
  handler: function(request, h) {
    cron.schedule("0/15 * * * * *", () => {
      console.log("running a task every minute");
    });
    return "hello world";
  }
});

server.route({
  method: "POST",
  path: "/order",
  handler: async function(request, h) {
    const data = {
      id: request.payload.id,
      purchaseAmount: request.payload.purchaseAmount,
      merchantID: request.payload.merchantID,
      dateTimeofPurchase: request.payload.dateTimeofPurchase,
      paymentAmount: request.payload.paymentAmount,
      customerID: request.payload.customerID,
      items: request.payload.items
    };

    const agenda = request.server.plugins["autotxn-agenda"].agenda;
    var job = agenda.create("place:order", data);
    job.schedule(new Date(Date.now() + 10000)).save();
    //const order = await addOrder({ data });
    return data;
  }
});

server.route({
  method: "GET",
  path: "/order/{id}",
  handler: async function(request, h) {
    const order = await getOrder(request.params.id);
    return order;
  }
});

server.route({
  method: "POST",
  path: "/customer",
  handler: async function(request, h) {
    const data = {
      firstName: request.payload.firstName,
      lastName: request.payload.lastName,
      birthdate: request.payload.birthdate,
      customerID: request.payload.customerID,
      gender: request.payload.gender
    };
    await addCustomer(data);
    return data;
  }
});

server.route({
  method: "GET",
  path: "/customer/{id}",
  handler: async function(request, h) {
    const customer = await getCustomer(request.params.id);
    return customer;
  }
});

server.route({
  method: "POST",
  path: "/merchant",
  handler: async function(request, h) {
    const data = {
      name: request.payload.name,
      merchantID: request.payload.merchantID,
      visa: request.payload.visa,
      salesPerson: request.payload.salesPerson,
      bonusPayment: request.payload.bonusPayment
    };
    await addMerchant(data);
    return data;
  }
});

server.route({
  method: "GET",
  path: "/merchant/{id}",
  handler: async function(request, h) {
    const merchant = await getMerchant(request.params.id);
    return merchant;
  }
});

const start = async function() {
  await server.register({
    plugin: require("./plugin/agenda.js")
  });
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
};

start();
