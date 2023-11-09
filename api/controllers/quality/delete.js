module.exports = {


  friendlyName: 'Delete',


  description: 'Delete quality.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    await Quality.destroyOne({ id: this.req.params.id })

    // All done.
    return 'Successful';

  }


};
