/**
 * Logbook.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    action: {
      type: 'string',
      isIn: ['Observe', 'Assist', 'Perform'],
      required: true
    },

    firstTitle: {
      type: 'string',
      required: true
    },

    firstYear: {
      type: 'string',
      required: true
    },

    firstDocument: {
      type: 'string',
    },

    secondTitle: {
      type: 'string',
      required: true
    },

    secondYear: {
      type: 'string',
      required: true
    },

    secondDocument: {
      type: 'string',
    },

    summary: {
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

