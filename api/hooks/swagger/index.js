const { routes } = require("../../../config/routes");

module.exports = function (sails) {
  const swaggerJSDoc = require("swagger-jsdoc");

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Clouder API Documentation",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:1337/",
          description: "Development server",
        },
        {
          url: "https://clouder-lkvb.onrender.com",
          description: "Production server",
        },
      ],
    },
    apis: [
      `${require("path").resolve(sails.config.appPath, "config/routes.js")}`,
    ],
  };

  const swaggerSpec = swaggerJSDoc(options);

  return {
    initialize: async function () {
      sails.log.info("Initializing Swagger hook");
      const swaggerUI = require("swagger-ui-express");

      // const dirname = require("path").resolve(
      //   sails.config.appPath,
      //   "swagger/swagger.json"
      // );
      // const swaggerDocument = dirname;

      sails.after("hook:http:loaded", () => {
        sails.hooks.http.app.use(
          "/api-docs",
          swaggerUI.serve,
          swaggerUI.setup(swaggerSpec)
        );
      });
      sails.log.info("Swagger hook ran successfully");
    },
  };
};
