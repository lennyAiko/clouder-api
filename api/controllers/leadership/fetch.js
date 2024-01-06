module.exports = {
  friendlyName: "Fetch",

  description: "Fetch leadership.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let leadershipRecord = await Leadership.find({
      owner: this.req.user.id,
    });

    if (!leadershipRecord) {
      sails.log("Could not find leadership");
      return this.res.status(404).json("Could not find leadership data");
    }

    // All done.
    return {
      message: "Successfully fetched leadership data",
      data: leadershipRecord,
    };
  },
};
