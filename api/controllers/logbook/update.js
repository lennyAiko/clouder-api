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
      maxBytes: 5000000, //5MB
      dirname: require('path').resolve(sails.config.appPath, 'assets/docs')
    }, async function whenDone(err, uploadFiles) {
        if (err) {
          return this.res.status(500).json({message: 'No file was uploaded'})
        }

        if (uploadFiles.length > 0) {
          await Logbook.updateOne({ id : logbookRecord.id })
          .set({ firstDocument : uploadFiles[0].fd })
        }
        
      }
    )

    this.req.file('secondDocument').upload({
      maxBytes: 5000000, //5MB
      dirname: require('path').resolve(sails.config.appPath, 'assets/docs')
    }, async function whenDone(err, uploadFiles) {
        if (err) {
          return this.res.status(500).json({message: 'No file was uploaded'})
        }
        
        if (uploadFiles.length > 0) {
          await Logbook.updateOne({ id : logbookRecord.id })
          .set({ secondDocument : uploadFiles[0].fd })
        }

      }
    )
    console.log(logbookRecord)
    // All done.
    return "Successful";

  }


};
