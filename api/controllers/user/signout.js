module.exports = {


  friendlyName: 'Logout',


  description: 'Logout auth.',


  inputs: {

  },


  exits: {

    success: {
      statusCode: 200
    },

    invalid: {
      statusCode: 400
    }

  },


  fn: async function (inputs, exits) {

    if (this.req.session.token) {
      this.req.session.token = '';
      return exits.success({message: 'User has logged out'});
    }

    return exits.invalid({message: 'No token in session'});

  }


};
