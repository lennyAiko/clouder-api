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
  friendlyName: "Create",

  description: "Create teaching.",

  inputs: {
    title: {
      type: "string",
      required: true,
      maxLength: 150,
      minLength: 3,
    },

    year: {
      type: "string",
      required: true,
      minLength: 4,
    },

    qualificationYear: {
      type: "string",
      required: true,
    },

    summary: {
      type: "string",
    },

    keyTakeaway: {
      type: "string",
    },
  },

  exits: {},

  fn: async function ({
    title,
    year,
    qualificationYear,
    summary,
    keyTakeaway,
  }) {
    let docRandomName;

    let teachingRecord = await Teaching.create({
      title,
      year,
      qualificationYear,
      summary,
      keyTakeaway,
      owner: this.req.user.id,
    }).fetch();

    this.req.file("document").upload(
      {
        maxBytes: 5000000, // 5MB
        dirname: require("path").resolve(
          sails.config.appPath,
          ".tmp/public/teaching"
        ),
        saveAs: function (file, cb) {
          docRandomName = `${randomStrings()}_${file.filename}`;
          cb(null, docRandomName);
        },
      },
      async function whenDone(err, uploadFiles) {
        if (err) {
          return res.status(500).json({ message: "No file was uploaded" });
        }

        docUrl = require("util").format(`${UPLOAD_URL}/${docRandomName}`);

        if (uploadFiles.length > 0) {
          await Teaching.updateOne({ id: teachingRecord.id }).set({
            document: docUrl,
          });
        }
      }
    );
    // All done.
    return "Successful";
  },
};
