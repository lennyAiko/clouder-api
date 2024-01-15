module.exports = {
  friendlyName: "Status",

  description: "update user status with admin.",

  inputs: {
    status: {
      type: "string",
      required: true,
      isIn: ["active", "inactive"],
    },
  },

  exits: {},

  fn: async function ({ status }) {
    let userRecord = await User.findOne({ id: this.req.params.id });

    if (!userRecord) {
      throw this.res.status(400).json("User not found");
    }

    await User.updateOne({ id: userRecord.id }).set({
      status,
    });

    // All done.
    return {
      status: 200,
      message: "Successful",
    };
  },
};
