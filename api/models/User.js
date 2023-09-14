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
      required: true
    },

    username: {
      type: 'string',
      required: true,
      maxLength: 60,
      unique: true
    },

    email: {
      type: 'string',
      required: true,
      isEmail: true,
      unique: true
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

  beforeCreate: async function (valueToSet, proceed) {
    sails.helpers.passwords
      .hashPassword(valueToSet.password)
      .exec((err, hashedPassword) => {
        if(err) {
          return proceed(err);
        }
        valueToSet.password = hashedPassword;
        return proceed();
      });
  }

};

