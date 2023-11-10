require('dotenv').config();
const UPLOAD_URL = process.env.UPLOAD_URL;

module.exports = {


  friendlyName: 'Update',


  description: 'Update course.',


  inputs: {

    courseTitle: {
      type: 'string',
      maxLength: 150
    },

    institution: {
      type: 'string',
      maxLength: 250
    },

    year: {
      type: 'string',
      maxLength: 4
    },

    certificateNo: {
      type: 'string',
    },

    challenges: {
      type: 'string',
    },

    keyPositives: {
      type: 'string',
    },

    doDifferently: {
      type: 'string',
    }

  },


  exits: {

  },


  fn: async function ({courseTitle, institution, year, certificateNo, challenges, keyPositives, doDifferently}) {

    let documentRandomName;

    this.req.file('document').upload({
      maxBytes: 5000000, // 5MB
      dirname: require('path').resolve(sails.config.appPath, '.tmp/public/courses'),
      saveAs: function(file, cb) {
        documentRandomName = `${randomStrings()}_${file.filename}`;
        cb(null, documentRandomName);
      }
    }, async function whenDone(err, uploadFiles) {
      if (err) {
        return this.res.status(500).json({message: 'No file was uploaded'});
      }

      docUrl = require('util').format(`${UPLOAD_URL}/${documentRandomName}`);

      if (uploadFiles.length > 0) {
        await Course.updateOne({ id : courseRecord.id })
          .set({ document : docUrl });
      }
    }
    );

    let courseRecord = await Course.updateOne({ id: this.req.params.id})
    .set({courseTitle, institution, year, certificateNo, challenges,
      keyPositives, doDifferently
    });

    // All done.
    return 'Successful';

  }


};
