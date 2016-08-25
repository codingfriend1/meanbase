
module.exports = function(app) {

  let admin;
  if(app.get('admin-email') && app.get('admin-pass')) {
    admin = {
      "email": app.get('admin-email'),
      "password": app.get('admin-pass'),
      "role": "admin"
    }
  } else {
    admin = {
      "email": "admin@admin.com",
      "password": "admin",
      "role": "admin"
    }
  }

  return admin;

};
