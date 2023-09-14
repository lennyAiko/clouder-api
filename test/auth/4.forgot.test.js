describe('POST /auth/forgot_password', () => {
  it('should return reset token', (done) => {
    global.supertest(global.web)
      .post('/auth/forgot_password')
      .send({
        'email': 'tester@dev.com'
      })
      .expect((res) => {
        global.reset = res.body.reset;
      })
      .expect(200, done);
  });
});
