"use sctrict";
require("dotenv").config();

const { addOrder, getOrder } = require("../util");

module.exports = async function(agenda) {
  agenda.define("place:order", (job, done) => {
    addOrder(job.attrs.data).then(() => {
      console.log("success");
      job.remove();
      done();
    });
  });
};
