module.exports = {


  friendlyName: 'Verify email',


  description: '',


  inputs: {

    token: {
      type: 'string'
    }

  },


  exits: {

    success: {
      statusCode: 200,
      responseType: 'redirect'
    },

    invalidOrExpiredToken: {
      statusCode: 400,
    },

    emailAlreadyInUse: {
      statusCode: 409,
    }

  },


  fn: async function ({token}) {

    if (!token) {
      throw 'invalidOrExpiredToken'
    }

    let userRecord = await User.findOne({ emailProofToken: token })
    
    if (!userRecord || userRecord.emailProofTokenExpiresAt <= Date.now()) {
      throw 'invalidOrExpiredToken'
    }

    if (userRecord.emailStatus == 'unverified') {
      await User.updateOne({ id: userRecord.id })
      .set({ 
        emailStatus: 'verified',
        emailProofToken: '',
        emailProofTokenExpiresAt: 0
      })
      
      return '/verified'
    } else if (userRecord.emailStatus == 'change-requested') {
      if (!userRecord.emailChangeCandidate) {
        throw new Error(
          'Could not update user'
        )
      }

      if ((await User.count({ email: userRecord.emailChangeCandidate })) > 0) {
        throw 'emailAlreadyInUse'
      }

      await User.updateOne({ id: userRecord.id })
      .set({
        emailStatus: 'confirmed',
        emailProofToken: '',
        emailProofTokenExpiresAt: 0
      })
      return '/'
    } else {
      throw new Error(
        'Consistency violation'
      )
    }

  }


};
