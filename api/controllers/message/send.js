// @ts-nocheck
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
  friendlyName: "Send",

  description: "Send message.",

  inputs: {
    message: {
      type: "string",
      required: true,
    },
    doc: {
      type: "string",
    },
  },

  exits: {},

  fn: async function (inputs) {
    let userEmail = this.req.user.email;

    let messageRecord = await Message.create({
      senderEmail: userEmail,
      message: inputs.message,
    }).fetch();

    this.req.file("doc").upload(
      {
        maxBytes: 5000000, // 5MB
        dirname: require("path").resolve(
          sails.config.appPath,
          ".tmp/public/logbook"
        ),
        saveAs: function (file, cb) {
          firstRandomName = `${randomStrings()}_${file.filename}`;
          cb(null, firstRandomName);
        },
      },
      async function whenDone(err, uploadFiles) {
        if (err) {
          return this.res.status(500).json({ message: "No file was uploaded" });
        }

        docUrl = require("util").format(`${UPLOAD_URL}/${firstRandomName}`);

        if (uploadFiles.length > 0) {
          await Message.updateOne({ id: messageRecord.id }).set({
            document: docUrl,
          });
        }
      }
    );

    // All done.
    return "Successful";
  },
};
