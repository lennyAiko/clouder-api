module.exports = {
  friendlyName: "Update",

  description: "Update teaching.",

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

    let teachingRecord = await Teaching.updateOne({
      id: this.req.params.id,
    }).set({
      title,
      year,
      qualificationYear,
      summary,
      keyTakeaway,
    });

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
