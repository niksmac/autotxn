const Agenda = require("agenda");
var agenda = {
  name: "autotxn-agenda",
  version: "1.0.0",
  register: async function(server, options) {
    const sigtermStop = () => {
      server.stop({ timeout: 10000 }, () => {
        agenda.stop(0);
        process.exit();
      });
    };

    const sigintStop = () => {
      server.stop({ timeout: 1000 }, () => {
        agenda.stop();
        process.exit(0);
      });
    };

    const connectionOpts = {
      db: {
        address: process.env.DB_HOST,
        options: {
          auto_reconnect: true,
          useNewUrlParser: true
        }
      }
    };
    const agenda = new Agenda(connectionOpts);
    const jobTypes = process.env.JOB_TYPES
      ? process.env.JOB_TYPES.split(",")
      : [];

    agenda.on("ready", function() {
      agenda._collection.updateMany(
        {
          lockedAt: {
            $exists: true
          }
        },
        {
          $unset: {
            lockedAt: undefined,
            lastModifiedBy: undefined,
            lastRunAt: undefined
          },
          $set: {
            nextRunAt: new Date()
          }
        }
      );

      jobTypes.forEach(type => {
        require("../jobs/" + type)(agenda);
      });
      if (jobTypes.length) {
        agenda.start();
      }
    });
    agenda.on("fail", function(err, job) {
      process.on("SIGTERM", sigtermStop);
      process.on("SIGINT", sigintStop);
    });

    server.expose("agenda", agenda);
    server.bind({ agenda: agenda });
  }
};

module.exports = agenda;
