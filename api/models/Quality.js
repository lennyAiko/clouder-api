/**
 * Quality.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
      maxLength: 150
    },

    year: {
      type: 'string',
      required: true,
      maxLength: 4
    },

    details: {
      type: 'string',
      required: true
    },

    challenges: {
      type: 'string',
      required: true
    },

    keyPositives: {
      type: 'string',
      required: true
    },

    doDifferently: {
      type: 'string',
      required: true,
    },

    // reference to user
    owner: {
      model: 'user'
    }

  },

};

