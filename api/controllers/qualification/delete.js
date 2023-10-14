module.exports = {


  friendlyName: 'Delete',


  description: 'Delete qualification.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    await Qualification.destroyOne({ id : this.req.params.id });

    // All done.
    return 'Successful';

  }


};
