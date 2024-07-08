module.exports = {
  friendlyName: "Fetch",

  description: "Fetch feedback.",

  inputs: {
    id: {
      type: "string",
      required: true,
    },
    option: {
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

  fn: async function ({ name, title, role, email, id, option }, exits) {
    let data;
    switch (option) {
      case "courses":
        data = await Course.findOne({ id });
        if (!data) {
          return exits.badCombo("Course not found");
        }
        break;
      case "research":
        data = await Research.findOne({ id });
        if (!data) {
          return exits.badCombo("Research not found");
        }
        break;
      case "logbook":
        data = await Logbook.findOne({ id });
        if (!data) {
          return exits.badCombo("Logbook not found");
        }
        break;
      default:
        return exits.badCombo("Invalid option");
    }
    // All done.
    return data;
  },
};
