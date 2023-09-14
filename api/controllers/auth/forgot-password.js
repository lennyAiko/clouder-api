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
      statusCode: 200,
      description: 'All good'
    },

    notFound: {
      statusCode: 400,
      description: 'User not found',
    }
  },


  fn: async function ({email}, exits) {

    email = email.toLowerCase();

    let userRecord = await User.findOne({ email: email });

    if (!userRecord) {
      return exits.notFound('User not found');
    }

    const resetToken = await sails.helpers.resetToken({ email: email });

    return exits.success(resetToken);

  }


};
