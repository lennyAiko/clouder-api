/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

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

    phone: {
      type: 'string',
      maxLength: 11
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

    // references
    qualifications: {
      collection: 'qualification',
      via: 'owner'
    },

    logbook: {
      collection: 'logbook',
      via: 'owner'
    },

    course: {
      collection: 'course',
      via: 'owner'
    }

  },

  customToJSON: function () {
    return _.omit(this, ['password', 'createdAt', 'updatedAt']);
  },

};

