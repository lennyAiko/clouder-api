module.exports = {
  friendlyName: "Paystack callback",

  description: "",

  inputs: {
    trxref: {
      type: "string",
      required: true,
    },
    reference: {
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function ({ trxref, reference }) {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${trxref}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_LIVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log(data);

    // @ts-ignore
    if (data.data.status !== "success") {
      return this.res.redirect("/failure-redirect");
    }

    // All done.
    return this.res.redirect("/success-redirect");
  },
};
