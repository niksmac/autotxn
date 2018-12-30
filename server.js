"use strict";
require("dotenv").load();
const Hapi = require("hapi");

const server = Hapi.server({
  host: "localhost",
  port: 8000
});

server.route({
  method: "GET",
  path: "/",
  handler: function(request, h) {
    return "hello world";
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
