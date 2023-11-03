module.exports = {


  friendlyName: 'Update',


  description: 'Update user.',


  inputs: {

    fullName: {
      type: 'string',
      maxLength: 120
    },
    location: { type: 'string' },
    phone: {
      type: 'string',
      maxLength: 11
    },

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


  fn: async function ({fullName, location, phone}, exits) {


    let user = await User.findOne({ id: this.req.user.id });

    const userPhone = phone ? phone : user.phone;
    const userLocation = location  ? location : user.location;
    const userFullName = fullName ? fullName : user.fullName;

    let updatedUser = await User.updateOne({ id: this.req.user.id })
    .set({
      fullName: userFullName,
      location: userLocation,
      phone: userPhone
    });

    if(!updatedUser) {
      throw exits.badCombo({
        message: 'The payload is invalid, could not update user.'
      });
    }

    // All done.
    return exits.success('User updated');

  }


};
