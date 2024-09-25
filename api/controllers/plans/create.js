module.exports = {
  friendlyName: "Create",

  description: "Create plans.",

  inputs: {
    name: {
      type: "string",
      required: true,
    },

    price: {
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs) {
    console.log(inputs);
    const plan = await Plan.create(inputs).fetch();
    // All done.
    return "Plan created successfully";
  },
};
