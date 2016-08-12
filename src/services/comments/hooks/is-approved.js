module.exports = options => {
  return async hook => {
    let autoAccept;
    if(hook.data) {
      autoAccept = await hook.app.service('settings').find({query: {name: 'auto-accept-comments'}});
    } else {
      return Promise.resolve(hook);
    }

    if(autoAccept.length > 0) {
      hook.data.approved = autoAccept[0].value;
    }
  }
}
