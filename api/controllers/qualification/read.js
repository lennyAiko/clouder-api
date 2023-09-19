module.exports = {


  friendlyName: 'Read',


  description: 'Read qualification.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let qualificationRecord = await Qualification.findOne({ id: this.req.params.id })
    
    if (!qualificationRecord) {
      return this.res.status(400).json('Could not find qualification')
    }

    // All done.
    return qualificationRecord;

  }


};
