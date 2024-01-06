module.exports = {
  friendlyName: "Update",

  description: "Update leadership.",

  inputs: {
    title: {
      type: "string",
      required: true,
    },
    startYear: {
      type: "string",
      required: true,
    },
    endYear: {
      type: "string",
      required: true,
    },
    challenges: {
      type: "string",
      required: true,
    },

    keyPositives: {
      type: "string",
      required: true,
    },

    doDifferently: {
      type: "string",
      required: true,
    },
  },

  exits: {
    badCombo: {
      statusCode: 400,
      description: "This is for error from user",
    },
  },

  fn: async function ({
    title,
    startYear,
    endYear,
    challenges,
    keyPositives,
    doDifferently,
  }) {
    let leadershipRecord = await Leadership.updateOne({
      id: this.req.params.id,
    }).set({
      title,
      startYear,
      endYear,
      challenges,
      keyPositives,
      doDifferently,
    });
    // All done.
    return {
      message: "Successfully updated a qualification",
      data: leadershipRecord,
    };
  },
};
