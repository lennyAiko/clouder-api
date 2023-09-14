var sails = require('sails');
var supertest = require('supertest');

before(function (done) {
  this.timeout(5000);

  sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' }
  }, (err) => {
    if (err) {return done(err);}
    global.sails = sails;
    global.supertest = supertest;
    global.web = sails.hooks.http.app;
    return done();
  });
});

after((done) => {
  sails.lower(done);
});
