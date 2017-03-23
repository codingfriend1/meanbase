import errors from 'feathers-errors';
const auth = require('feathers-authentication').hooks;
export default options => {
  return hook => {
    if (!hook.params.provider) { return hook; }

    if(hook.data.password) {
      return auth.hashPassword()(hook);
    } else {
      return hook;
    }
  }
}
