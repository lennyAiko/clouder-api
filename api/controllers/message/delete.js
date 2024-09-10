module.exports = {
  friendlyName: "Delete",

  description: "Delete message.",

  inputs: {
    id: {
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs) {
    await Message.destroyOne({ id: inputs.id });

    // All done.
    return "Successful";
  },
};
