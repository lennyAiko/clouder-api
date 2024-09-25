module.exports = {
  friendlyName: "Fetch",

  description: "Fetch plans.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const plans = await Plan.find({});

    // All done.
    return plans;
  },
};
