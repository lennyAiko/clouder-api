module.exports = {


  friendlyName: 'Reset password',


  description: '',


  inputs: {
    token: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },
  },


  exits: {

    success: {
      description: 'Successful',
      responseType: 'ok'
    },

    invalid: {
      description: 'Invalid',
      responseType: 'badRequest'
    }

  },


  fn: async function ({token, password}, exits) {

    if (!token) { 
      throw {invalid: 'No token provided'}
    }

    const user = await User.findOne({ passwordResetToken: token })

    if (!user || user.passwordResetTokenExpiresAt <= Date.now()) {
      throw {invalid: 'Token expired'}
    }

    const hashedPassword = await sails.helpers.passwords.hashPassword(password);

    await User.updateOne({ id: user.id })
    .set({
      password: hashedPassword,
      passwordResetToken: '',
      passwordResetTokenExpiresAt: 0
    })

    return exits.success('Password updated successfully');

  }

};
