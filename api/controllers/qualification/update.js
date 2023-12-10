module.exports = {
  friendlyName: "Update",

  description: "Update qualification.",

  inputs: {
    education: {
      type: "json",
    },

    challenges: {
      type: "string",
    },

    keyPositives: {
      type: "string",
    },

    doDifferently: {
      type: "string",
    },
  },

  exits: {
    badCombo: {
      statusCode: 400,
      description: "This is for error from user",
    },
  },

  fn: async function ({ education, challenges, keyPositives, doDifferently }) {
    let qualificationRecord = await Qualification.updateOne({
      id: this.req.params.id,
    }).set({
      education,
      challenges,
      keyPositives,
      doDifferently,
    });

    // All done.
    return {
      message: "Successfully updated a qualification",
      data: qualificationRecord,
    };
  },
};
