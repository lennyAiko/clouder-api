module.exports = {
  friendlyName: "Read",

  description: "Read message.",

  inputs: {
    id: {
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs) {
    let messageRecord = await Message.findOne({ id: inputs.id });

    if (!messageRecord) {
      return this.res.status(404).json("Could not find message");
    }

    // All done.
    return messageRecord;
  },
};
