/**
 * Research.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
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

    feedback: {
      type: "json",
    },

    feedbackRequested: {
      type: "boolean",
      defaultsTo: false,
    },

    owner: {
      model: "user",
    },
  },
};
