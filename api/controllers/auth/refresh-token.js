module.exports = {


  friendlyName: 'Refresh token',


  description: '',


  inputs: {

    refresh: {
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      statusCode: 200,
      description: 'Description for when token is valid'
    },

    invalidToken: {
      statusCode: 401,
      description: 'Description for when token is invalid'
    }

  },


  fn: async function ({refresh}, exits) {

    await sails.helpers.verifyRefreshToken(refresh, async (err, decode) => {
      if (err || !decode) {
        return exits.invalidToken({ error: 'Send a valid refresh token' });
      }
      const payload = {
        id: decode.user.id,
        username: decode.user.username,
        email: decode.user.email,
      };
      const accessToken = await sails.helpers.refreshToken({ user: payload, issuer: decode.issuer });
      this.req.session.token = accessToken
      return exits.success({ message: `${decode.user.email}'s token has been updated`, accessToken});
    });
    return;

  }


};
