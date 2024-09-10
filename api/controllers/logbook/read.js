module.exports = {
  friendlyName: "Read",

  description: "Read logbook.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let logbookRecord = await Logbook.findOne({ id: this.req.params.id });

    if (!logbookRecord) {
      return this.res.status(400).json("Could not find logbook");
    }

    // All done.
    return logbookRecord;
  },
};
