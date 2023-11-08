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
      maxLength: 120,
      columnName: 'full_name'
    },

    img: {
      type: 'string'
    },

    email: {
      type: 'string',
      required: true,
      isEmail: true,
      unique: true,
      maxLength: 200
    },

    emailStatus: {
      type: 'string',
      isIn: ['unverified', 'verified', 'change-requested'],
      defaultsTo: 'unverified',
      columnName: 'email_status'
    },

    emailChangeCandidate: {
      type: 'string',
      isEmail: true,
      description: 'unverified email address that this user wants to change to',
      columnName: 'email_change_candidate'
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
      protect: true,
      minLength: 8
    },

    passwordResetToken: {
      type: 'string',
      columnName: 'password_reset_token'
    },

    passwordResetTokenExpiresAt: {
      type: 'number',
      columnName: 'password_reset_token_expires_at'
    },

    emailProofToken: {
      type: 'string',
      columnName: 'email_proof_token'
    },

    emailProofTokenExpiresAt: {
      type: 'number',
      columnName: 'email_proof_token_expires_at'
    },

    // references
    qualification: {
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
    },

    qi: {
      collection: 'quality',
      via: 'owner'
    }

  },

  customToJSON: function () {
    return _.omit(this, ['password', 'createdAt', 'updatedAt', 'emailChangeCandidate', 'passwordResetToken', 'passwordResetTokenExpiresAt', 'emailProofToken', 'emailProofTokenExpiresAt', 'tosAcceptedByIp']);
  },

};

