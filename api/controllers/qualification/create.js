module.exports = {


  friendlyName: 'Create',


  description: 'Create qualification.',


  inputs: {

    education: {
      type: 'json',
      required: true
    },

    challenges: {
      type: 'string',
      required: true,
    },

    keyPositives: {
      type: 'string',
      required: true,
    },

    doDifferently: {
      type: 'string',
      required: true
    }

  },


  exits: {

  },


  fn: async function ({education, challenges, keyPositives, doDifferently}) {

    let qualificationRecord = await Qualification.create({
      education, challenges, keyPositives, doDifferently
    }).fetch()

    // All done.
    return qualificationRecord;

  }


};
