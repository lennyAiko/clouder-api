module.exports = {
  friendlyName: "Delete",

  description: "Delete message.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    await Message.destroyOne({ id: this.req.params.id });

    // All done.
    return "Successful";
  },
};
