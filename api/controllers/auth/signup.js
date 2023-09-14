const { v4: uuidv4 } = require('uuid');

module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {

    username: { type: 'string', required: true },
    email: { type: 'string', required: true, isEmail: true },
    password: { type: 'string', required: true, protect: true }

  },


  exits: {

    success: {
      statusCode: 200,
      description: 'This is for a successful transaction'
    },

    badCombo: {
      statusCode: 400,
      description: 'This is for a bad entry from the user'
    },

    invalidData: {
      statusCode: 409,
      description: 'This is for existing data from the user'
    }

  },


  fn: async function ({username, email, password}, exits) {

    // check if user exists
    let checkUser = await User.findOne({ username: username });
    if (checkUser) {
      return exits.invalidData({message: 'User already exists'});
    }

    // create user and catch error
    try {
      email = email.toLowerCase();
      const hashedPassword = await sails.helpers.passwords.hashPassword(password)
      let user = await User.create({ id: uuidv4(), username, email, password: hashedPassword}).fetch();
      return exits.success(user);
    } catch (error) {
      return exits.badCombo(error);
    }
  }


};
