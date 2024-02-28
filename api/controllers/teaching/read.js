module.exports = {
  friendlyName: "View",

  description: "View teaching.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let teachingRecord = await Teaching.findOne({ id: this.req.params.id });

    if (!teachingRecord) {
      return this.res.status(400).json("Could not find teaching");
    }

    // All done.
    return teachingRecord;
  },
};
