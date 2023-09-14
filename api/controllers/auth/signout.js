module.exports = {


  friendlyName: 'Logout',


  description: 'Logout auth.',


  inputs: {

  },


  exits: {
    
    success: {
      statusCode: 200
    }

  },


  fn: async function (inputs, exits) {

    this.req.session.token = '';

    // All done.
    return exits.success({message: 'User has logged out'});

  }


};
