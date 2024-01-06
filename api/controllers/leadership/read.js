module.exports = {
  friendlyName: "Read",

  description: "Read leadership.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let leadershipRecord = await Leadership.findOne({ id: this.req.params.id });

    if (!leadershipRecord) {
      sails.log("Could not find leadership");
      return this.res.status(404).json("Could not fine leadership data");
    }
    // All done.
    return {
      message: "Successfully read a leadership data",
      data: leadershipRecord,
    };
  },
};
