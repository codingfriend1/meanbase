
module.exports = function(app) {

  let admin;
  if(app.get('admin-email') && app.get('admin-pass')) {
    admin = {
      "email": app.get('admin-email'),
      "password": app.get('admin-pass'),
      "role": "admin"
    }
    return admin;
  }

};
