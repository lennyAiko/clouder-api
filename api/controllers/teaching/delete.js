module.exports = {
  friendlyName: "Delete",

  description: "Delete teaching.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    await Teaching.destroyOne({ id: this.req.params.id });
    // All done.
    return "Successful";
  },
};
