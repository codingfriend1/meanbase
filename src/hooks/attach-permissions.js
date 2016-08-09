import _ from 'lodash';

export default options => {
  return async hook => {
    try {
      let role;

      if(hook.params.user) {
        role = hook.params.user.role;
      } else if(hook.result) {
        role = hook.result.role;
      }

      if(!role) { return Promise.resolve(hook); }

      let access = await hook.app.service('roles').find({query: { role } });

      let permissions;
      if(access.length > 0) {
        access = access[0];
        permissions = _.keys(_.pickBy(access.permissions, value => value));
      } else {
        permissions = [];
      }

      if(hook.params.user) {
        hook.params.user.permissions = permissions;
      } else if(hook.type === 'after' && hook.result && !Array.isArray(hook.result)) {
        hook.result.permissions = permissions;
      }

      return Promise.resolve(hook);
    } catch(err) {
      console.log("error attaching permissions: ", err);
      return Promise.reject(err);
    }
  }
};
