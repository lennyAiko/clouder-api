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
      description: 'The token is accepted and the user is verified',
      responseType: 'ok'
    },

    invalidOrExpiredToken: {
      description: 'The token is expired or invalid',
      responseType: 'badRequest'
    },

    emailAlreadyInUse: {
      description: 'The email to be verified already exists',
      responseType: 'conflicted'
    }

  },


  fn: async function ({token}, exits) {

    if (!token) {
      throw {invalidOrExpiredToken: 'The token is expired or invalid, Please sign up again'};
    }

    let userRecord = await User.findOne({ emailProofToken: token });

    if (!userRecord || userRecord.emailProofTokenExpiresAt <= Date.now()) {
      throw {invalidOrExpiredToken: 'The token is expired or invalid, Please sign up again'};
    }

    if (userRecord.emailStatus == 'unverified') {
      await User.updateOne({ id: userRecord.id })
      .set({
        emailStatus: 'verified',
        emailProofToken: '',
        emailProofTokenExpiresAt: 0
      });

      return exits.success('User verified');
    } else if (userRecord.emailStatus == 'change-requested') {
      if (!userRecord.emailChangeCandidate) {
        throw new Error(
          'Could not update user'
        );
      }

      if ((await User.count({ email: userRecord.emailChangeCandidate })) > 0) {
        throw {emailAlreadyInUse: "Email already exists"};
      }

      await User.updateOne({ id: userRecord.id })
      .set({
        emailStatus: 'confirmed',
        emailProofToken: '',
        emailProofTokenExpiresAt: 0
      });
      return exits.success('User confirmed');
    } else {
      throw new Error(
        'Consistency violation'
      );
    }

  }


};
