module.exports = {


  friendlyName: 'Update',


  description: 'Update qualification.',


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

    badCombo: {
      statusCode: 400,
      description: "This is for error from user"
    }

  },


  fn: async function ({education, challenges, keyPositives, doDifferently}) {

    let qualificationRecord = await Qualification.updateOne({ id: this.req.params.id })
    .set({ 
      education, challenges, keyPositives, doDifferently
    })

    // All done.
    return qualificationRecord;

  }


};
