module.exports = {
  friendlyName: "Fetch",

  description: "Fetch teaching.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let teachingRecords = await Teaching.find({ owner: this.req.user.id });

    // All done.
    return teachingRecords;
  },
};
