module.exports = function (sails) {
  return {
    initialize: async function () {
      sails.log.info("Initializing Swagger hook");
      const swaggerUI = require("swagger-ui-express");
      const dirname = require("path").resolve(
        sails.config.appPath,
        "swagger/swagger.json"
      );
      const swaggerDocument = dirname;
      sails.after("hook:http:loaded", () => {
        sails.hooks.http.app.use(
          "/api-docs",
          swaggerUI.serve,
          swaggerUI.setup(swaggerDocument)
        );
      });
      sails.log.info("Swagger hook ran successfully");
    },
  };
};
