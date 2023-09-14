module.exports = {


  friendlyName: 'Reset password',


  description: '',


  inputs: {
    token: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true,
      isEmail: true
    },

    password: {
      type: 'string',
      required: true
    },

    confirmPassword: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      statusCode: 200,
      description: 'Successful'
    },

    invalid: {
      statusCode: 400,
      description: 'Invalid'
    }

  },


  fn: async function ({token, email, password, confirmPassword}, exits) {

    // compare password and confirmpassword
    // compare new password with existing password

    email = email.toLowerCase();

    await sails.helpers.verifyResetToken(token, async (err, decode) => {
      if (err || !decode) {
        return exits.invalid({ error: 'Send a valid reset token'});
      }

      if (email !== decode.email) {
        return exits.invalid({ error: 'Email does not match' });
      }

      if (password !== confirmPassword) {
        return exits.invalid({ error: 'Passwords do not match' });
      }

      hashedPassword = await sails.helpers.passwords.hashPassword(password);
      await User.updateOne({ email: decode.email }).set({ password: hashedPassword });

      return exits.success('Password updated successfully');

    });

  }

};
