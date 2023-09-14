require('dotenv').config();
const tokenIssuer = process.env.TOKEN_ISSUER;

module.exports = {


  friendlyName: 'Login',


  description: 'Login auth.',


  inputs: {

    username: { type: 'string', required: true },
    password: { type: 'string', required: true, protect: true }

  },


  exits: {
    success: {
      statusCode: 201,
      description: 'If all credentials are correct'
    },
    badCombo: {
      statusCode: 401,
      description: 'If wrong credentials'
    }
  },


  fn: async function ({username, password}, exits) {

    let userRecord = await User.findOne({ username: username });
    if (!userRecord) {
      return exits.badCombo({
        error: 'Invalid credentials'
      });
    }

    await sails.helpers.passwords
    .checkPassword(password, userRecord.password)
    .intercept('incorrect', () => {
      return exits.badCombo({
        error: 'Invalid credentials'
      });
    });

    const payload = {
      id: userRecord.id,
      username: userRecord.username,
      email: userRecord.email
    };

    const token = await sails.helpers.signToken({user: payload, issuer: tokenIssuer});

    var message;
    if (this.req.session.token) {
      this.req.session.token = token.access;
      message = `${userRecord.email} has an active token, token updated`;
    } else {
      this.req.session.token = token.access;
      message = `${userRecord.email} has logged in`;
    }

    return exits.success({
      message,
      access: token.access,
      refresh: token.refresh,
      data: userRecord
    });

  }


};
