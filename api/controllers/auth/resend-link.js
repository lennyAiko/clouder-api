module.exports = {


  friendlyName: 'Resend link',


  description: '',


  inputs: {

    email: {
      type: 'string',
      required: true,
      isEmail: true
    }

  },


  exits: {

    success: {
      description: 'The mail is sent again.',
      responseType: 'ok'
    },

    invalidEmail: {
      description: 'The user is already verified',
      responseType: 'badRequest'
    }

  },


  fn: async function ({email: userEmail}, exits) {

    const email = userEmail.toLowerCase()

    let userRecords = await User.findOne({ email })

    if (!userRecords) {
      return exits.invalidEmail('Email not found')
    }

    if (userRecords.emailStatus == 'verified') {
      return exits.invalidEmail('The user is verified')
    } 
    else {
      await User.updateOne({ email })
      .set({
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL
      })
      await sails.helpers.mail.send.with({
        subject: 'Verify your email',
        template: 'email-verify-account',
        to: email,
        templateData: {
          token: userRecords.emailProofToken,
          fullName: userRecords.fullName
        }
      })

      return exits.success("Email has been sent again")
    }

  }


};
