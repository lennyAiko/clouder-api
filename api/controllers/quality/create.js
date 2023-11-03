module.exports = {


  friendlyName: 'Create',


  description: 'Create quality-improvement.',


  inputs: {

    title: {
      type: 'json',
      required: true
    },
    
    year: {
      type: 'json',
      required: true
    },

    details: {
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

    success: {
      description: 'User submission is correct',
      responseType: 'accepted'
    }

  },


  fn: async function ({title, year, details, challenges, keyPositives, doDifferently}, exits) {

    let qiRecord = await Quality.create({
      owner: this.req.user.id,
      title, year, details, keyPositives, doDifferently, challenges
    }).fetch()

    // All done.
    return exits.success(qiRecord);

  }


};
