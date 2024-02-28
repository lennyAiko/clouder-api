module.exports = {
  friendlyName: "Fetch",

  description: "Fetch research.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let researchRecords = await Research.find({ owner: this.req.user.id });

    // All done.
    return researchRecords;
  },
};
