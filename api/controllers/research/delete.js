module.exports = {
  friendlyName: "Delete",

  description: "Delete research.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    await Research.destroyOne({ id: this.req.params.id });

    // All done.
    return;
  },
};
