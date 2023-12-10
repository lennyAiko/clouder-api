/**
 * Pricing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: "string",
      required: true,
      maxLength: 30,
    },
    duration: {
      type: "string",
      required: true,
      maxLength: 30,
    },
    pricing: {
      type: "string",
      required: true,
      maxLength: 30,
    },
    plans: {
      type: "ref",
      required: true,
    },
  },
};
