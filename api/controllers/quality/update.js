module.exports = {
  friendlyName: "Update",

  description: "Update quality.",

  inputs: {
    title: {
      type: "json",
    },

    year: {
      type: "json",
    },

    details: {
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

    type: {
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
    year,
    details,
    challenges,
    keyPositives,
    doDifferently,
    type,
  }) {
    let qualityRecord = await Quality.updateOne({ id: this.req.params.id }).set(
      {
        title,
        year,
        details,
        challenges,
        keyPositives,
        doDifferently,
        type,
      }
    );

    // All done.
    return qualityRecord;
  },
};
