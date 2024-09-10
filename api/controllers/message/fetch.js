module.exports = {
  friendlyName: "Fetch",

  description: "Fetch message.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let messageRecords = await Message.find({});

    // All done.
    return messageRecords;
  },
};
