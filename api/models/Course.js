/**
 * Course.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    courseTitle: {
      type: 'string',
      required: true,
      maxLength: 150
    },

    institution: {
      type: 'string',
      required: true,
      maxLength: 250
    },

    year: {
      type: 'string',
      required: true,
      maxLength: 4
    },

    certificateNo: {
      type: 'string',
      required: true
    },

    document: {
      type: 'string'
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

