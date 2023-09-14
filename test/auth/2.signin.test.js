/*
Sign in a user and use the same instance to fetch the user profile
This way the token is still available in the session
This method might be necessary for all authenticated endpoints
*/
describe('POST /auth/signin', () => {
  it('should sign in a user', (done) => {
    global.supertest(global.web)
    .post('/auth/signin')
    .send({
      'username': 'tester',
      'password': 'password123'
    })
    .expect(async (res) => {
      global.refresh = res.body.refresh;

      await global.supertest(global.web)
      .get('/user/profile')
      .auth(res.body.access, { type: 'bearer' })
      .expect((res) => {
        console.log(res.error);
      })
      .expect(200);

    })
    .expect(201, done);

  });

});
