module.exports = {


  friendlyName: 'Fetch',


  description: 'Fetch course.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let courseRecords = await Course.find({ owner: this.req.user.id })

    // All done.
    return courseRecords;

  }


};
