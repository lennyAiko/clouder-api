module.exports = {
  friendlyName: "Verify",

  description: "update user verification with admin.",

  inputs: {
    emailStatus: {
      type: "string",
      required: true,
      isIn: ["verified", "unverified"],
    },
  },

  exits: {},

  fn: async function ({ emailStatus }) {
    let userRecord = await User.findOne({ id: this.req.params.id });

    if (!userRecord) {
      throw this.res.status(400).json("User not found");
    }

    await User.updateOne({ id: userRecord.id }).set({
      emailStatus,
    });

    // All done.
    return {
      status: 200,
      message: "Successful",
    };
  },
};
