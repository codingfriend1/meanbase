export default permissionName => {
  return hook => {
    if (!hook.params.provider) { return hook; }
    if(!hook.params.user) {
      throw new Error('Cannot check permissions of a non-existant user.');
    } else if (hook.params.user.permissions.indexOf(permissionName) === -1 && hook.params.user.permissions.indexOf('allPrivilages') === -1) {
      throw new Error('You must be a(n) ' + permissionName + ' to do that.');
    }
  };
};
