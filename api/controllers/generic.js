module.exports = {
  friendlyName: "Generic",

  description: "Generic something.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    // All done.
    return {
      status: 200,
      message: "Clouder API",
    };
  },
};
