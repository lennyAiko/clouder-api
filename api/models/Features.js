/**
 * Features.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    logbooks: {
      type: "number",
      defaultsTo: 0,
    },
    leaderships: {
      type: "number",
      defaultsTo: 0,
    },
    subscriptions: {
      type: "number",
      defaultsTo: 0,
    },
    owner: {
      model: "user",
    },
  },
};
