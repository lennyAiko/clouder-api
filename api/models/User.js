/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'string',
      columnName: '_id',
    },

    fullName: {
      type: 'string',
      required: true,
      maxLength: 120
    },

    email: {
      type: 'string',
      required: true,
      isEmail: true,
      unique: true
    },

    location: {
      type: 'string',
      maxLength: 60
    },

    password: {
      type: 'string',
      required: true,
      protect: true
    },

  },

  customToJSON: function () {
    return _.omit(this, ['password', 'createdAt', 'updatedAt']);
  },

};

