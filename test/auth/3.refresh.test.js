describe('POST /auth/refresh', () => {
  it('should refresh token', (done) => {
    global.supertest(global.web)
      .post('/auth/refresh')
      .send({
        'refresh': `${global.refresh}`
      })
      .expect(200, done);
  });
});
