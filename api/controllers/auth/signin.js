require("dotenv").config();
const tokenIssuer = process.env.TOKEN_ISSUER;

module.exports = {
  friendlyName: "Login",

  description: "Login auth.",

  inputs: {
    email: { type: "string", required: true, isEmail: true },
    password: { type: "string", required: true, protect: true },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "If all credentials are correct",
    },
    badCombo: {
      statusCode: 401,
      description: "If wrong credentials",
    },
  },

  fn: async function ({ email, password }, exits) {
    email = email.toLowerCase();

    let userRecord = await User.findOne({ email });
    if (!userRecord) {
      return exits.badCombo({
        error: "Invalid credentials",
      });
    }

    if (userRecord.emailStatus == "unverified") {
      return exits.badCombo({
        error: "User or Email not verified",
      });
    }

    await sails.helpers.passwords
      .checkPassword(password, userRecord.password)
      .intercept("incorrect", () => {
        return exits.badCombo({
          error: "Invalid credentials",
        });
      });

    const token = await sails.helpers.signToken({
      user: {
        id: userRecord.id,
        fullName: userRecord.fullName,
        email: userRecord.email,
        phone: userRecord.phone,
        location: userRecord.location ? userRecord.location : null,
        role: userRecord.role,
        status: userRecord.status,
        emailStatus: userRecord.emailStatus,
        plan: userRecord.plan,
      },
      issuer: tokenIssuer,
    });

    await sails.getDatastore().leaseConnection(async (db) => {
      let TokenRecord = await Token.findOne({
        userId: userRecord.id,
      }).usingConnection(db);

      if (TokenRecord) {
        await Token.updateOne({ userId: userRecord.id })
          .set({ token: token.access })
          .usingConnection(db);
      } else {
        await Token.create({
          userId: userRecord.id,
          token: token.access,
        }).usingConnection(db);
      }
    });

    return exits.success({
      access: token.access,
      refresh: token.refresh,
      role: userRecord.role,
      plan: userRecord.plan,
    });
  },
};
