module.exports = {


  friendlyName: 'Logout',


  description: 'Logout auth.',


  inputs: {

  },


  exits: {

    success: {
      responseType: 'accepted'
    },

    invalid: {
      responseType: 'badRequest'
    }

  },


  fn: async function (inputs, exits) {

    if (this.req.user.id) {
      await Token.destroyOne({ userId: this.req.user.id })
      return exits.success({message: 'User has logged out'});
    }

    return exits.invalid({message: 'No token in session'});

  }


};
