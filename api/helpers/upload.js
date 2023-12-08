function randomStrings(length, chars) {
  var length = 16;
  var result = "";
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
  for (var i = length; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
}

module.exports = {
  friendlyName: "Upload",

  description: "Upload something.",

  inputs: {
    filename: {
      type: "string",
      required: true,
    },
    useCustomPath: {
      type: "boolean",
      required: true,
    },
    customPath: {
      type: "string",
    },
    uploadSize: {
      type: "number",
      required: true,
    },
    uploadURL: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    // TODO
  },
};
