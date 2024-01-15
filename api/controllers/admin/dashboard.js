module.exports = {
  friendlyName: "Dashboard",

  description: "Dashboard admin.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    let totalUsers = await User.count({});
    let totalActiveUsers = await User.count({ status: "active" });
    let totalVerifiedUsers = await User.count({ emailStatus: "verified" });

    // All done.
    return {
      status: 200,
      message: "Admin dashboard fetched successfully",
      data: {
        totalUsers,
        totalActiveUsers,
        totalVerifiedUsers,
      },
    };
  },
};
