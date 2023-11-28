require("dotenv").config();
const UPLOAD_URL = process.env.UPLOAD_URL;

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
  friendlyName: "Update",

  description: "Update user.",

  inputs: {
    fullName: {
      type: "string",
      maxLength: 120,
    },
    location: { type: "string" },
    phone: {
      type: "string",
      maxLength: 11,
    },
  },

  exits: {
    success: {
      description: "This is for a successful transaction",
      responseType: "ok",
    },

    badCombo: {
      description: "This is for a bad entry from the user",
      responseType: "badRequest",
    },

    invalidData: {
      description: "This is for existing data from the user",
      responseType: "conflicted",
    },
  },

  fn: async function ({ fullName, location, phone }, exits) {
    const reqUser = this.req.user;
    let imgRandomName;

    this.req.file("img").upload(
      {
        maxBytes: 2000000, //2MB
        dirname: require("path").resolve(
          sails.config.appPath,
          ".tmp/public/user_images"
        ),
        saveAs: function (file, cb) {
          imgRandomName = `${randomStrings()}_${file.filename}`;
          cb(null, imgRandomName);
        },
      },
      async function whenDone(err, uploadedFiles) {
        if (err) {
          // return this.res.status(500).json({ message: "No file was uploaded" });
          return this.res.serverError(err);
        }

        let imgUrl = require("util").format(
          `${UPLOAD_URL}/user_images/${imgRandomName}`
        );

        if (uploadedFiles.length > 0) {
          await User.updateOne({ id: reqUser.id }).set({ img: imgUrl });
        }
      }
    );

    await User.updateOne({ id: reqUser.id }).set({
      fullName: fullName || reqUser.fullName,
      location: location || reqUser.location,
      phone: phone || reqUser.phone,
    });

    // All done.
    return exits.success("User updated");
  },
};
