module.exports = {
  friendlyName: "Fetch",

  description: "Fetch pricing.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let pricingRecords = await Pricing.find({});

    // All done.
    return {
      data: pricingRecords,
      message: "Successfully fetched pricing",
      status: 200,
    };
  },
};
