module.exports = {
  friendlyName: "Read",

  description: "Read research.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let researchRecord = await Research.findOne({ id: this.req.params.id });

    if (!researchRecord) {
      return this.res.status(400).json("Could not find research");
    }

    // All done.
    return researchRecord;
  },
};
