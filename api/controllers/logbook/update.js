module.exports = {


  friendlyName: 'Update',


  description: 'Update logbook.',


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

    let logbookRecord = await Logbook.updateOne({ id : this.req.params.id })
    .set({ 
      action, firstTitle, firstYear, secondTitle, secondYear, summary,
      challenges, keyPositives, doDifferently
    })

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
        
        docUrl = require('util').format(`http://localhost:1337/${firstRandomName}`)

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
       
        docUrl = require('util').format(`http://localhost:1337/${secondRandomName}`)

        if (uploadFiles.length > 0) {
          await Logbook.updateOne({ id : logbookRecord.id })
          .set({ secondDocument : docUrl })
        }
      }
    )
    // All done.
    return "Successful";

  }

};
