module.exports = {


  friendlyName: 'Read',


  description: 'Read course.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let courseRecord = await Course.findOne({ id: this.req.params.id })
    
    if (!courseRecord) {
      return this.res.status(400).json({message: 'Invalid ID'})
    }

    // All done.
    return courseRecord;

  }


};
