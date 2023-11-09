module.exports = {


  friendlyName: 'Fetch',


  description: 'Fetch quality.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let qualityRecord = await Quality.findOne({ owner: this.req.user.id })

    // All done.
    return qualityRecord;

  }


};
