export default (options) => {
  return hook => {
    if (!hook.params.provider) { return hook; }
    if(!hook.params.user) {
      throw new Error('Cannot check enabled of a non-existant user.');
    } else if(!hook.params.user.enabled) {
      throw new Error('Your account must be enabled to do that.');
    }
  }
};
