require("dotenv").config();

module.exports = {
  friendlyName: "Paystack",

  description: "Paystack something.",

  inputs: {
    firstName: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      isEmail: true,
    },
    courseTitle: {
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function ({ firstName, courseTitle, email }) {
    //@ts-ignore
    let course = await Courses.findOne({ title: courseTitle });

    const amount = parseInt(course.fee.replace(",", ""));

    // @ts-ignore
    const paystackUrl = await sails.helpers.paymentUrl(
      firstName,
      course.title,
      email,
      amount
    );

    // All done.
    // return { url: paystackUrl }
    return { url: paystackUrl.data.authorization_url };
  },
};
