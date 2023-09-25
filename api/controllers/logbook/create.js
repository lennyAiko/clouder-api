module.exports = {


  friendlyName: 'Create',


  description: 'Create logbook.',



  


  exits: {

  },


  fn: async function ({action, firstTitle, firstYear, firstDocument, secondTitle, secondYear, secondDocument, 
    summary, challenges, keyPositives, doDifferently}) {

    if (firstDocument) {
        this.req.file('firstDocument').upload({
        maxBytes: 5000000, //5MB
        dirname: require('path').resolve(sails.config.appPath, 'assets/docs')
      }, function whenDone(err, uploadFiles) {
          if (err) {
            return this.res.status(500).json({message: 'No file was uploaded'})
          }

          if (uploadFiles.length === 0) {
            return this.res.status(500).json({message: 'No file was uploaded'})
          }

          firstDocument = uploadFiles
        }
      )
    }
    
    if (secondDocument) {
        this.req.file('secondDocument').upload({
        maxBytes: 5000000, //5MB
        dirname: require('path').resolve(sails.config.appPath, 'assets/docs')
      }, function whenDone(err, uploadFiles) {
          if (err) {
            return this.res.status(500).json(err)
          }

          if (uploadFiles.length === 0) {
            return this.res.status(500).json(err)
          }

          secondDocument = uploadFiles
        }
      )
    }

    let logbookRecord = await Logbook.create({ 
      action, firstTitle, firstYear, 
      firstDocument: "A file", 
      secondTitle, secondYear, 
      secondDocument: `${this.req.user}`, 
      summary, challenges, keyPositives, doDifferently,
      owner: this.req.user.id
    }).fetch()
    
    // All done.
    return logbookRecord;

  }


};
