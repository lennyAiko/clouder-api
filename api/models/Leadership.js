/**
 * Leadership.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: "string",
      required: true,
      maxLength: 150,
    },
    startYear: {
      type: "string",
      required: true,
      maxLength: 11,
      columnName: "start_year",
    },
    endYear: {
      type: "string",
      required: true,
      maxLength: 11,
      columnName: "end_year",
    },
    challenges: {
      type: "string",
      required: true,
    },

    keyPositives: {
      type: "string",
      required: true,
    },

    doDifferently: {
      type: "string",
      required: true,
    },

    // reference to user
    owner: {
      model: "user",
    },
  },
};
