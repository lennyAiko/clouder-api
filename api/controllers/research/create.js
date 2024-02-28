module.exports = {
  friendlyName: "Create",

  description: "Create research.",

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
    let researchRecord = await Research.create({
      title,
      year,
      authors,
      summary,
      findings,
      area,
      owner: this.req.user.id,
    }).fetch();

    // All done.
    return researchRecord;
  },
};
