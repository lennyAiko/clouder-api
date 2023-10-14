module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {

    fullName: { 
      type: 'string', 
      required: true,
      maxLength: 120
    },
    location: { type: 'string' },
    phone: { type: 'string' },
    email: { 
      type: 'string', 
      required: true, 
      isEmail: true 
    },
    password: { 
      type: 'string', 
      required: true, 
      protect: true,
      minLength: 8
    }

  },


  exits: {

    success: {
      description: 'This is for a successful transaction',
      responseType: 'ok'
    },

    badCombo: {
      description: 'This is for a bad entry from the user',
      responseType: 'badRequest'
    },

    invalidData: {
      description: 'This is for existing data from the user',
      responseType: 'conflicted'
    }

  },


  fn: async function ({fullName, phone, location, email: userEmail, password}, exits) {
    
    const email = userEmail.toLowerCase();
  
    const hashedPassword = await sails.helpers.passwords.hashPassword(password)

    const unverifiedUser = await User.create({ 
      fullName, 
      phone, 
      location, 
      email, 
      password: hashedPassword,
      tosAcceptedByIp: this.req.ip,
      emailProofToken: sails.helpers.strings.random('url-friendly'),
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL
    })
      .intercept('E_UNIQUE', 'invalidData')
      .intercept({ name: 'usageError' }, () => {
        throw {
          badCombo: {
            problems: [
              "Something went wrong trying to sign you up. Please try again."
            ]
          }
        }
      })
      .fetch();

    await sails.helpers.mail.send.with({
      subject: 'Verify your email',
      template: 'email-verify-account',
      to: unverifiedUser.email,
      templateData: {
        token: unverifiedUser.emailProofToken,
        fullName: unverifiedUser.fullName
      }
    })

    return exits.success("User can check mail");
  }

};
