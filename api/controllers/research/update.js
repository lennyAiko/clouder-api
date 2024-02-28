module.exports = {
  friendlyName: "Update",

  description: "Update research.",

  inputs: {
    title: {
      type: "string",
      required: true,
      maxLength: 300,
    },

    year: {
      type: "string",
      required: true,
      maxLength: 10,
      minLength: 4,
    },

    authors: {
      type: "ref",
      required: true,
    },

    summary: {
      type: "string",
    },

    findings: {
      type: "string",
    },

    area: {
      type: "string",
    },
  },

  exits: {},

  fn: async function ({ title, year, authors, summary, findings, area }) {
    let researchRecord = await Research.updateOne({
      id: this.req.params.id,
    }).set({ title, year, authors, summary, findings, area });

    if (!researchRecord) {
      return this.res.status(400).json("Could not find research");
    }

    // All done.
    return "Successful";
  },
};
