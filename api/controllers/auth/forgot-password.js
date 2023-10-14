module.exports = {


  friendlyName: 'Forgot password',


  description: '',


  inputs: {

    email: {
      type: 'string',
      required: true,
      isEmail: true
    },

  },


  exits: {

    success: {
      description: 'All good',
      responseType: 'ok'
    },

    notFound: {
      description: 'User not found',
      responseType: 'notFound'
    }
  },


  fn: async function ({email}, exits) {

    email = email.toLowerCase();

    let userRecord = await User.findOne({ email: email });
    if (!userRecord) {
      return exits.notFound('User not found');
    }

    const resetToken = await sails.helpers.strings.random('url-friendly')

    await User.updateOne({ id: userRecord.id })
    .set({
      passwordResetToken: resetToken,
      passwordResetTokenExpiresAt: Date.now() + sails.config.custom.passwordResetTokenTTL
    })

    await sails.helpers.mail.send.with({
      to: userRecord.email,
      subject: 'Password reset instructions',
      template: 'email-reset-password',
      templateData: {
        fullName: userRecord.fullName,
        token: resetToken
      }
    })

    return exits.success('Check email');

  }


};
