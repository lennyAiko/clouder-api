module.exports = {
  friendlyName: "Create",

  description: "Create quality-improvement.",

  inputs: {
    title: {
      type: "string",
      required: true,
    },

    year: {
      type: "string",
      required: true,
    },

    details: {
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

    type: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "User submission is correct",
      responseType: "accepted",
    },
  },

  fn: async function (
    { title, year, details, challenges, keyPositives, doDifferently, type },
    exits
  ) {
    let qualityRecord = await Quality.create({
      owner: this.req.user.id,
      title,
      year,
      details,
      keyPositives,
      doDifferently,
      challenges,
      type,
    }).fetch();

    // All done.
    return exits.success(qualityRecord);
  },
};
