let auth = {
  currentUser: undefined,

  login: async user => {
    return feathers.authenticate({
      type: 'local',
      email: user.email,
      password: user.password
    }).then(result => {
      auth.currentUser = feathers.get('user')
      return currentUser
    }).catch(err => {
      console.error('Error authenticating', err)
      this.logout()
      return false
    })
  },

  logout: async user => {
    feathers.logout()
    currentUser = undefined
  },

  signup: async user => {
    if(!user) {
      toastr.error('Please fill out the user information')
      return false
    }

    return api.users.create(user).then(response => {
      return feathers.authenticate({
        type: 'local',
        email: user.email,
        password: user.password
      }).then(result => {
        auth.currentUser = feathers.get('user')
        return currentUser
      }).catch(err => {
        console.error('Error signing up', err)
        return false
      })
    }, err => {
      console.log("Error creating user", err)
      toastr.error(err)
    })
  },

  changePassword: (oldPassword, newPassword) => {
    return api.users.update({ _id: currentUser._id }, {
      oldPassword: oldPassword,
      newPassword: newPassword
    })
  },

  verifyReset: feathers.service('/api/verifyReset/:action/:value'),

  resendVerify: function resendVerify(email, cb) {
    if(!email) { return false }
    if(currentUser && currentUser.isVerified) {
      toastr.success("This account has already been verified")
    }
    return this.verifyReset.create({ action: 'resend', value: email }).then(function(response) {
      toastr.success('Resent email verification')
    }, function(err) {
      console.log('Error resending email verification', err)
      toastr.warning(err)
    })
  },

  verifySignUp: function verifySignUp(slug, cb) {
    if(!slug) { return false }
    if(currentUser && currentUser.isVerified) {
      toastr.success("This account has already been verified")
    }
    return this.verifyReset.create({ action: 'verify', value: slug }).then(function(response) {
      toastr.success('Your account has been verified.')
      console.log("account verified", response)
      return response
    }, function(err) {
      console.log('Error sending verification email', err)
    })
  },

  sendResetPassword: function sendResetPassword(email, cb) {
    if(!email) { return false }
    return this.verifyReset.create({ action: 'forgot', value: email }).then(function(response) {
      toastr.success('Please check your email. A link to reset your password has been sent.')
    }, function(err) {
      toastr.warning(err)
      console.log('Error sending reset password email', err)
    })
  },

  saveResetPassword: function saveResetPassword(slug, password, cb) {
    return this.verifyReset.create({ action: 'reset', value: slug, data: { password } }).then(function(response) {
      toastr.success('Your password was updated.')
      return true
    }, function(err) {
      console.log("Error saving reset password", err)
      toastr.warning('Sorry but there was an error updating your password.')
    })
  },

  getToken: () => feathers.get('token'),

  isLoggedIn: () => {
    return feathers.authenticate().then(response => {
      auth.currentUser = feathers.get('user')
      return auth.currentUser
    }, err => {
      console.log("Currently not logged in", err);
    });
  },

  hasPermission: permissionName => {
    if(!auth.currentUser || _.isEmpty(auth.currentUser)) {
      return this.isLoggedIn().then(isLoggedIn => {
        if(isLoggedIn) {
          auth.currentUser = feathers.get('user');
          if(!auth.currentUser.hasOwnProperty('permissions')) { return false; }
          if(auth.currentUser.permissions.includes(permissionName) || auth.currentUser.permissions.includes('allPrivilages')) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }, err => {
        console.log('promise rejected', err);
        return false
      })
      feathers.authenticate().then(function(result) {

      }, function(err) {
        return false
      });
    } else if(auth.currentUser.hasOwnProperty('permissions')) {
      // If user's role is in meanbaseGlobals.roles then check roles to see if user has permission
      // Or if user has allPrivilages
      if(auth.currentUser.permissions.includes(permissionName) || auth.currentUser.permissions.includes('allPrivilages')) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },

  hasPermissionSync: permissionName => {
    if(!auth.currentUser) { return false }
    if(auth.currentUser.permissions.includes(permissionName) || auth.currentUser.permissions.includes('allPrivilages')) {
      return true
    } else {
      return false
    }
  }

}

window.auth = auth

export default auth
