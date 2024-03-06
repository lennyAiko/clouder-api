/**
 * Quality.js
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

    year: {
      type: "string",
      required: true,
      maxLength: 12,
    },

    type: {
      type: "string",
      isIn: ["morbidity", "clinical", "case"],
      defaultsTo: "morbidity",
    },

    details: {
      type: "string",
      required: true,
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
