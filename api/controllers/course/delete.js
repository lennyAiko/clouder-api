module.exports = {


  friendlyName: 'Delete',


  description: 'Delete course.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    await Course.destroyOne({ id : this.req.params.id });

    // All done.
    return 'Successful';

  }


};
