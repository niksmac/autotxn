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

import {
  addOrder,
  getOrder,
  addCustomer,
  getCustomer,
  addMerchant,
  getMerchant
} from "./util";

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
    const order = await addOrder({ data });
    return order;
  }
});

server.route({
  method: "GET",
  path: "/order",
  handler: async function(request, h) {
    const order = await getOrder(request.payload.id);
    return order;
  }
});

const start = async function() {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
};

start();
