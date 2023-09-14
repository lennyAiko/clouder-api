describe('POST /auth/signup', () => {
  it('should sign up a user', (done) => {
    global.supertest(global.web)
    .post('/auth/signup')
    .send({
      'username': 'tester',
      'email': 'tester@dev.com',
      'password': 'password123'
    })
    .expect(200, done);
  });
});
