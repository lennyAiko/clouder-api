describe('#createUser()', () => {
  it('should create a user', async () => {
    let user = await User.createEach([
      {
        id: '1',
        username: 'lenny',
        email: 'lenny@dev.com',
        password: 'password123'
      },
      {
        id: '2',
        username: 'danny',
        email: 'danny@dev.com',
        password: 'password123'
      },
      {
        id: '3',
        username: 'dave',
        email: 'dave@dev.com',
        password: 'password123'
      },
      {
        id: '4',
        username: 'sammy',
        email: 'sammy@dev.com',
        password: 'password123'
      },
    ]).fetch();
    if (!user) {
      return new Error('Should create a user but it failed');
    }
  });
});
