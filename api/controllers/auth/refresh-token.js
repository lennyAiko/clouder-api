module.exports = {
  friendlyName: "Refresh token",

  description: "",

  inputs: {
    refresh: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Description for when token is valid",
    },

    invalidToken: {
      statusCode: 401,
      description: "Description for when token is invalid",
    },
  },

  fn: async function ({ refresh }, exits) {
    await sails.helpers.verifyRefreshToken(refresh, async (err, decode) => {
      if (err || !decode) {
        return exits.invalidToken({ error: "Send a valid refresh token" });
      }
      const payload = {
        id: decode.user.id,
        email: decode.user.email,
        fullName: decode.user.fullName,
        phone: decode.user.phone,
        location: decode.user.location ? decode.user.location : null,
        role: decode.user.role,
        status: decode.user.status,
        emailStatus: decode.user.emailStatus,
        plan: decode.user.plan,
        subscriptions: decode.user.subscriptions,
      };
      const accessToken = await sails.helpers.refreshToken({
        user: payload,
        issuer: decode.issuer,
      });
      // this.req.session.token = accessToken;
      await sails.getDatastore().leaseConnection(async (db) => {
        let TokenRecord = await Token.findOne({
          userId: decode.user.id,
        }).usingConnection(db);

        if (TokenRecord) {
          await Token.updateOne({ userId: decode.user.id })
            .set({ token: accessToken.access })
            .usingConnection(db);
        } else {
          await Token.create({
            userId: decode.user.id,
            token: accessToken.access,
          }).usingConnection(db);
        }
      });
      return exits.success({
        message: `${decode.user.email}'s token has been updated`,
        accessToken,
      });
    });
  },
};
