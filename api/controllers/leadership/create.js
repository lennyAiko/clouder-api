module.exports = {
  friendlyName: "Create",

  description: "Create leadership.",

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

  exits: {},

  fn: async function ({
    title,
    startYear,
    endYear,
    challenges,
    keyPositives,
    doDifferently,
  }) {
    // All done.
    const leadershipRecord = await Leadership.create({
      owner: this.req.user.id,
      title,
      startYear,
      endYear,
      challenges,
      keyPositives,
      doDifferently,
    }).fetch();

    let leadershipFeature = await Features.findOne({ owner: userId });

    await Features.updateOne({ owner: userId }).set({
      leaderships: leadershipFeature + 1,
    });

    return {
      status: 200,
      message: "Successfully created a leadership",
      data: leadershipRecord,
    };
  },
};
