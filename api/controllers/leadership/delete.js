module.exports = {
  friendlyName: "Delete",

  description: "Delete leadership.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    await Leadership.destroyOne({ id: this.req.params.id });

    // All done.
    return "Successful";
  },
};
