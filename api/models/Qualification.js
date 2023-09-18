/**
 * Qualification.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    education: {
      type: 'json',
      custom: function (value) {
        return  
      }
    }

  },

};

