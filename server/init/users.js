var userPile = [];
var basic = {
  provider: 'local',
  role: 'basic',
  name: 'Test User',
  email: 'test@test.com',
  password: 'test'
};

var admin = {
  provider: 'local',
  role: 'admin',
  name: 'Admin',
  email: 'admin@admin.com',
  password: 'admin'
};

userPile.push(admin);
userPile.push(basic);

module.exports = userPile
