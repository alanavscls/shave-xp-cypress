const { defineConfig } = require("cypress");

const { Pool } = require("pg");

const dbConfig = {
  host: "motty.db.elephantsql.com",
  user: "qaocsbsy",
  password: "qE0YMVaYyvY1NSmVxJLZuwRNeWvw15sP",
  database: "qaocsbsy",
  port: 5432,
};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        removeUser(email) {
          return new Promise(function (resolve) {
            const pool = new Pool(dbConfig);

            pool.query(
              "DELETE FROM users WHERE email = $1",
              [email],
              function (error, result) {
                if (error) {
                  throw error;
                }
                resolve({ sucess: result });
              }
            );
          });
        },
      });
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "http://localhost:3000",
  },
});
