/**
 * Token.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    userId: {
      type: 'string',
      required: true,
      unique: true
    },

    token: {
      type: 'string',
      required: true,
      unique: true
    }

  },

};

