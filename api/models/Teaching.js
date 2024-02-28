/**
 * Teaching.js
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
      minLength: 3,
    },

    year: {
      type: "string",
      required: true,
      minLength: 4,
    },

    qualificationYear: {
      columnName: "qualification_year",
      type: "string",
      required: true,
    },

    document: {
      type: "string",
    },

    summary: {
      type: "string",
    },

    keyTakeaway: {
      columnName: "key_takeaway",
      type: "string",
    },

    owner: {
      model: "user",
    },
  },
};
