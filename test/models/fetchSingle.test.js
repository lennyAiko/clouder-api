describe('#fetchSingleArticle()', () => {
  it('should fetch single article', (done) => {
    User.findOne({ username: 'lenny' })
    .then((data) => {
      if (!data) {
        return done(new Error('User not found'));
      }
      return done();
    })
    .catch(done);
  });
});
