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

  description: "Create course.",

  inputs: {
    courseTitle: {
      type: "string",
      required: true,
      maxLength: 150,
    },

    institution: {
      type: "string",
      required: true,
      maxLength: 250,
    },

    year: {
      type: "string",
      required: true,
      maxLength: 4,
    },

    certificateNo: {
      type: "string",
      required: true,
    },

    challenges: {
      type: "string",
      required: true,
    },

    keyPositives: {
      type: "string",
      required: true,
    },

    doDifferently: {
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function ({
    courseTitle,
    institution,
    year,
    certificateNo,
    challenges,
    keyPositives,
    doDifferently,
  }) {
    let documentRandomName;

    let courseRecord = await Course.create({
      courseTitle,
      institution,
      year,
      certificateNo,
      challenges,
      keyPositives,
      doDifferently,
      owner: this.req.user.id,
    }).fetch();

    this.req.file("document").upload(
      {
        maxBytes: 5000000, // 5MB
        dirname: require("path").resolve(
          sails.config.appPath,
          ".tmp/public/courses"
        ),
        saveAs: function (file, cb) {
          documentRandomName = `${randomStrings()}_${file.filename}`;
          cb(null, documentRandomName);
        },
      },
      async function whenDone(err, uploadFiles) {
        if (err) {
          return this.res.status(500).json({ message: "No file was uploaded" });
        }

        let docUrl = require("util").format(
          `${UPLOAD_URL}/${documentRandomName}`
        );

        if (uploadFiles.length > 0) {
          await Course.updateOne({ id: courseRecord.id }).set({
            document: docUrl,
          });
        }
      }
    );

    // All done.
    return "Successful";
  },
};
