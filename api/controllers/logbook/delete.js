module.exports = {


  friendlyName: 'Delete',


  description: 'Delete logbook.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    await Logbook.destroyOne({ id : this.req.params.id });

    // All done.
    return 'Successful';

  }


};
