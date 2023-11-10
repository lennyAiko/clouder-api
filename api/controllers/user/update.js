require('dotenv').config();
const UPLOAD_URL = process.env.UPLOAD_URL;

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

    const reqUser = this.req.user
    let imgRandomName

    this.req.file('img').upload({
      maxBytes: 2000000, //2MB
      dirname: require('path').resolve(sails.config.appPath, '.tmp/public/userImages'),
      saveAs: function(file, cb) {
        imgRandomName = `${randomStrings()}_${file.filename}`
        cb(null, imgRandomName)
      }
    }, async function whenDone(err, uploadFiles) {
      if (err) {
        return this.res.status(500).json({message: 'No file was uploaded'});
      }

      imgUrl = require('util').format(`${UPLOAD_URL}/${documentRandomName}`);

      if (uploadFiles.length > 0) {
        await User.updateOne({ id : reqUser.id })
          .set({ img : imgUrl });
      }

    })

    let updatedUser = await User.updateOne({ id: reqUser.id })
    .set({
      fullName: fullName || reqUser.fullName,
      location: location || reqUser.location,
      phone: phone || reqUser.phone
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
