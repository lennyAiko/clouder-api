describe('#fetchAllUsers()', () => {
  it('should fetch all Users', (done) => {
    User.find({})
    .then((data) => {
      if (data.length < 1) {
        return done(new Error('No user created'));
      }
      return done();
    })
    .catch(done);
  });
});
