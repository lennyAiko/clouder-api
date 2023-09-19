module.exports = {


  friendlyName: 'Fetch',


  description: 'Fetch qualification.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let qualificationRecords = await Qualification.find({ owner: this.req.user.id })

    // All done.
    return qualificationRecords;

  }


};
