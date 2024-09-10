/**
 * Message.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    senderEmail: {
      type: "string",
      required: true,
      columnName: "sender_email",
    },

    message: {
      type: "string",
      required: true,
    },

    document: {
      type: "string",
    },
  },
};
