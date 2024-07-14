module.exports = {
  friendlyName: "Submit",

  description: "Submit feedback.",

  inputs: {
    id: {
      type: "string",
      required: true,
    },
    option: {
      type: "string",
      required: true,
    },
    feedback: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
      responseType: "ok",
    },
    badCombo: {
      description: "Bad combo",
      responseType: "badRequest",
    },
  },

  fn: async function ({ id, option, feedback }, exits) {
    switch (option) {
      case "courses":
        await Course.updateOne({ id }).set({
          feedback,
        });
        break;
      case "research":
        await Research.updateOne({ id }).set({
          feedback,
        });
        break;
      case "logbook":
        await Logbook.updateOne({ id }).set({
          feedback,
        });
        break;
      default:
        return exits.badCombo("Invalid option");
    }
    // All done
    return exits.success("Feedback submitted");
  },
};
