module.exports = {
  friendlyName: "Role",

  description: "update user role with admin.",

  inputs: {
    role: {
      type: "string",
      required: true,
      isIn: ["supervisor", "client"],
    },
  },

  exits: {},

  fn: async function ({ role }) {
    let userRecord = await User.findOne({ id: this.req.params.id });

    if (!userRecord) {
      throw this.res.status(400).json("User not found");
    }

    await User.updateOne({ id: userRecord.id }).set({
      role,
    });

    // All done.
    return {
      status: 200,
      message: "Successful",
    };
  },
};
