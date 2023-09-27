module.exports = {


  friendlyName: 'Fetch',


  description: 'Fetch logbook.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let logbookRecords = await Logbook.find({ owner: this.req.user.id })

    // All done.
    return logbookRecords;

  }


};
