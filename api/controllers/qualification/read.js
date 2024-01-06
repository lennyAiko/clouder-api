module.exports = {
  friendlyName: "Read",

  description: "Read qualification.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let qualificationRecord = await Qualification.findOne({
      id: this.req.params.id,
    });

    if (!qualificationRecord) {
      return this.res.status(404).json("Could not find qualification");
    }

    // All done.
    return {
      message: "Successfully read a qualification",
      data: qualificationRecord,
    };
  },
};
