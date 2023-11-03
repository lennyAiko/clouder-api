module.exports = {


  friendlyName: 'Profile',


  description: 'Profile user.',


  inputs: {

  },


  exits: {
    notFound: {
      description: 'When user not found',
      responseType: 'notFound'
    },
  },


  fn: async function () {

    let userRecord = await User.findOne({ id: this.req.user.id });

    if (!userRecord) {
      throw exits.notFound('User not found');
    }

    // All done.
    return userRecord;

  }


};
