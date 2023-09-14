module.exports = {


  friendlyName: 'Profile',


  description: 'Profile user.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return this.req.user;

  }


};
