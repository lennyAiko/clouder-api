module.exports = {


  friendlyName: 'Read',


  description: 'Read quality.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let qualityRecord = await Quality.findOne({ id: this.req.params.id })
    
    if (!qualityRecord) {
      return this.res.status(400).json('Could not find logbook'); 
    }

    // All done.
    return qualityRecord;

  }


};
