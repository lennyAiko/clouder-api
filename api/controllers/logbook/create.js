require('dotenv').config()

function randomStrings(length, chars) {
  var length = 16
  var result = ''
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))]
  return result
}

module.exports = {


  friendlyName: 'Create',


  description: 'Create logbook.',


  inputs: {

    action: { type: 'string' },
    firstTitle: { type: 'string' },
    firstYear: { type: 'string' },
    secondTitle: { type: 'string' },
    secondYear: { type: 'string' },
    summary: { type: 'string' },
    challenges: { type: 'string' },
    keyPositives: { type: 'string' },
    doDifferently: { type: 'string' },

  },


  exits: {

  },


  fn: async function ({action, firstTitle, firstYear, secondTitle, secondYear, 
    summary, challenges, keyPositives, doDifferently}) {

    let userId = this.req.user.id
    let firstRandomName, secondRandomName

    let logbookRecord = await Logbook.create({ 
      action, firstTitle, firstYear, secondTitle, secondYear, summary,
      challenges, keyPositives, doDifferently,
      owner: userId
    }).fetch()

    this.req.file('firstDocument').upload({
      maxBytes: 5000000, // 5MB
      dirname: require('path').resolve(sails.config.appPath, '.tmp/public'),
      saveAs: function(file, cb) {
        firstRandomName = `${randomStrings()}_${file.filename}`
        cb(null, firstRandomName);
      }
    }, async function whenDone(err, uploadFiles) {
        if (err) {
          return this.res.status(500).json({message: 'No file was uploaded'})
        }

        docUrl = require('util').format(`${UPLOAD_URL}/${firstRandomName}`)

        if (uploadFiles.length > 0) {
          await Logbook.updateOne({ id : logbookRecord.id })
          .set({ firstDocument : docUrl })
        }
      }
    )

    this.req.file('secondDocument').upload({
      maxBytes: 5000000, //5MB
      dirname: require('path').resolve(sails.config.appPath, '.tmp/public'),
      saveAs: function(file, cb) {
        secondRandomName = `${randomStrings()}_${file.filename}`
        cb(null, secondRandomName);
      }
    }, async function whenDone(err, uploadFiles) {
        if (err) {
          return this.res.status(500).json({message: 'No file was uploaded'})
        }
        
        docUrl = require('util').format(`${UPLOAD_URL}/${secondRandomName}`) 

        if (uploadFiles.length > 0) {
          await Logbook.updateOne({ id : logbookRecord.id })
          .set({ secondDocument : docUrl })
        }
      }
    )

    // All done.
    return "Successful"
  }

};
