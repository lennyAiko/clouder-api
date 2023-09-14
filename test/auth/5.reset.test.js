describe('POST /auth/reset_password', () => {
  it('should reset user password', (done) => {
    global.supertest(global.web)
      .post('/auth/reset_password')
      .send({
        'token': `${global.reset}`,
        'email': 'tester@dev.com',
        'password': 'password1234',
        'confirmPassword': 'password1234'
      })
      .expect(200, done);
  });
});
