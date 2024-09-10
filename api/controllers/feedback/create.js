module.exports = {
  friendlyName: "Create",

  description: "Create feedback.",

  inputs: {
    name: {
      type: "string",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      isEmail: true,
    },
    id: {
      type: "string",
      required: true,
    },
    option: {
      type: "string",
      required: true,
      isIn: ["courses", "research", "logbook"],
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

    if (data.feedbackRequested) {
      return exits.badCombo("Feedback already requested");
    }

    await sails.helpers.mail.send.with({
      subject: "Feedback Request on Clouder",
      template: "email-request-feedback",
      to: email,
      templateData: {
        fullName: name,
        user: this.req.user.fullName,
        option,
        id,
      },
    });

    data.updateOne({ feedbackRequested: true });

    // All done.
    return exits.success("Feedback requested successfully");
  },
};
