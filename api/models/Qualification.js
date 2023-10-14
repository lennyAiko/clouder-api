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
      required: true,
      custom: function (value) {
        const checkValues = ['degree', 'year', 'institution', 'certificate'];
        let store = []; let holder = [];
        for (i in value) {
          for (obj in value[i]) { store.push(obj); }
          holder.push(store);
          store = [];
        }
        for (i in holder) {
          if (JSON.stringify(holder[i]) == JSON.stringify(checkValues)) { continue; }
          else { return false; }
        }
        return true;
      }
    },

    challenges: {
      type: 'string',
      required: true
    },

    keyPositives: {
      type: 'string',
      required: true
    },

    doDifferently: {
      type: 'string',
      required: true,
    },

    // reference to user
    owner: {
      model: 'user'
    }
  },

};

