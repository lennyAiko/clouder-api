module.exports = {
  friendlyName: "Fetch users",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let userRecords = await User.find({});

    // All done.
    return {
      status: 200,
      message: "Successfully fetched users",
      data: userRecords,
    };
  },
};
